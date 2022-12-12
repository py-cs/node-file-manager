import { open } from "fs/promises";
import { workerData } from "worker_threads";
import { parsePathArray } from "../parsers.js";

const add = async () => {
  const [filePath] = parsePathArray(workerData);

  await open(filePath, "wx");
};

add();
