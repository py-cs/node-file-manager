import { workerData } from "worker_threads";
import { osOperations } from "../os-operations.js";

const getOSInfo = () => {
  const [_, param] = workerData;
  const osOperation = osOperations[param];

  osOperation();
};

getOSInfo();
