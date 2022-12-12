import { createReadStream } from "fs";
import { workerData } from "worker_threads";
import { pipeline } from "stream/promises";
import { parsePathArray } from "../parsers.js";

const cat = async () => {
  const [filePath] = parsePathArray(workerData);

  const stream = createReadStream(filePath);
  await pipeline(stream, process.stdout);
};

cat();
