import path from "path";
import os from "os";
import { stat, access } from "fs/promises";
import { createInterface } from "readline";
import { fileURLToPath } from "url";
import { Worker } from "worker_threads";
import { parseUserName, parseCommand } from "./parsers.js";
import { inputError, operationError } from "./errors.js";
import { inputValidator } from "./validator.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class FileManager {
  #inputValidator;
  #cwd;
  #readline;
  #userName;

  constructor(inputValidator) {
    this.#inputValidator = inputValidator;

    this.#cwd = os.homedir();

    this.#readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.#userName = parseUserName();
  }

  start() {
    console.log(`Welcome to the File Manager, ${this.#userName}`);

    ["exit", "SIGINT"].forEach((event) =>
      process.on(event, () => {
        console.log(
          `Thank you for using File Manager, ${this.#userName}, goodbye!`
        );
      })
    );

    this.#handleInput();
  }

  async #handleInput() {
    this.#readline.question(
      `${os.EOL}You are currently in ${this.#cwd} directory ${os.EOL}> `,
      (command) => {
        this.#processCommand(command);
      }
    );
  }

  async #processCommand(line) {
    const [command, args] = parseCommand(line);
    try {
      if (!this.#inputValidator.validate(command, args)) {
        throw inputError;
      }
      if (Object.hasOwn(this.__proto__, command)) {
        await this[command](...args);
      } else {
        await this.#processCommandInWorker(command, [this.#cwd, ...args]);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      this.#handleInput();
    }
  }

  async #processCommandInWorker(command, workerData) {
    await new Promise((resolve, reject) => {
      const commandFile = path.resolve(__dirname, `commands/${command}.js`);

      const worker = new Worker(commandFile, { workerData });

      worker.on("error", () => {
        reject(operationError);
      });
      worker.on("exit", () => {
        resolve();
      });
    });
  }

  async cd(pathToDirectory) {
    if (pathToDirectory.endsWith(":")) {
      pathToDirectory += "\\";
    }

    let newPath = path.resolve(this.#cwd, pathToDirectory);

    try {
      const stats = await stat(newPath);

      if (!stats.isDirectory()) {
        throw operationError;
      }

      await access(newPath);
      this.#cwd = newPath;
      console.log("set", this.#cwd);
    } catch {
      throw operationError;
    }
  }

  async up() {
    await this.cd("..");
  }

  [".exit"]() {
    process.exit();
  }
}

new FileManager(inputValidator).start();
