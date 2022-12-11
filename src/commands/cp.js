import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { workerData } from "worker_threads";
import { parsePathArray } from "../parsers.js";

const cp = async () => {
  const [sourceFile, newDirectory] = parsePathArray(workerData);
  const destFile = path.resolve(newDirectory, path.basename(sourceFile));

  const readStream = createReadStream(sourceFile);
  const writeStream = createWriteStream(destFile);

  readStream.pipe(writeStream);
};

cp();
