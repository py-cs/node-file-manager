import { readdir } from "fs/promises";
import { workerData } from "worker_threads";

export async function ls() {
  const [cwd] = workerData;

  const files = await readdir(cwd, { withFileTypes: true });

  const list = files
    .filter((file) => file.isDirectory() || file.isFile())
    .sort((a, b) => a.isFile() - b.isFile() || a - b)
    .map((file) => ({
      Name: file.name,
      Type: file.isFile() ? "file" : "directory",
    }));

  console.table(list);
}

ls();
