import { createReadStream } from "fs";
import { createHash } from "crypto";
import { workerData } from "worker_threads";
import { pipeline } from "stream/promises";
import { Writable } from "stream";
import { parsePathArray } from "../parsers.js";

const hash = async () => {
  const [fileName] = parsePathArray(workerData);

  const source = createReadStream(fileName);
  const hash = createHash("sha256").setEncoding("hex");

  const destination = new Writable({
    write: (chunk, _, cb) => {
      console.log(chunk.toString());
      cb();
    },
  });

  await pipeline(source, hash, destination);
};

hash();
