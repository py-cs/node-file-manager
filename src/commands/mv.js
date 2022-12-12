import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { rm as remove } from "fs/promises";
import { workerData } from "worker_threads";
import { parsePathArray } from "../parsers.js";

const mv = async () => {
  const [sourceFile, newDirectory] = parsePathArray(workerData);
  const destFile = path.resolve(newDirectory, path.basename(sourceFile));

  const readStream = createReadStream(sourceFile);
  const writeStream = createWriteStream(destFile);

  readStream.pipe(writeStream);

  readStream.on("end", async () => await remove(sourceFile));
};

mv();
