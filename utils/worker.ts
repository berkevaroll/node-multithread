import { Worker } from "worker_threads";

// Create worker object using ./workers/worker.js script
export const createWorker = (chunk: number[]) => {
  return new Promise<number[]>((resolve, reject) => {
    const worker = new Worker("./workers/worker.js", {
      workerData: { path: "./worker.ts", chunk },
    });
    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (message) => {
      reject(`Error occured: ${message}`);
    });
  });
};
