import { rm as remove } from "fs/promises";
import { workerData } from "worker_threads";
import { parsePathArray } from "../parsers.js";

const rm = async () => {
  const [fileName] = parsePathArray(workerData);

  await remove(fileName);
};

rm();
