import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { workerData } from "worker_threads";
import { parsePathArray } from "../parsers.js";

const compress = async () => {
  const [sourceFile, destFile] = parsePathArray(workerData);

  const readStream = createReadStream(sourceFile);
  const writeStream = createWriteStream(destFile);
  const brotli = createBrotliCompress();

  await pipeline(readStream, brotli, writeStream);
};

compress();
