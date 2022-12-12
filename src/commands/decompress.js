import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { workerData } from "worker_threads";
import { parsePathArray } from "../parsers.js";

const compress = async () => {
  const [sourceFile, destFile] = parsePathArray(workerData);

  const readStream = createReadStream(sourceFile);
  const writeStream = createWriteStream(destFile);
  const unbrotli = createBrotliDecompress();

  await pipeline(readStream, unbrotli, writeStream);
};

compress();
