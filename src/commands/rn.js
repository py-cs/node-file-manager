import { rename } from "fs/promises";
import path from "path";
import { workerData } from "worker_threads";

const rn = async () => {
  const [cwd, sourcePath, newFileName] = workerData;
  
  const sourceFile = path.resolve(cwd, sourcePath);
  const destFile = path.resolve(path.dirname(sourceFile), newFileName);

  await rename(sourceFile, destFile);
};

rn();
