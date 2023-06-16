import { Request, Response, NextFunction } from "express";
import { THREAD_COUNT } from "../utils/constants";
import { createWorker } from "../utils/worker";

// Find prime numbers using multithreading
const findPrimesMultiThread = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: RequestModel = req.body;
  const numbers = body.data;
  // Get optimum chunksize by maximum thread (Ceil if less than 1)
  const chunkSize = Math.ceil(numbers.length / THREAD_COUNT);

  const workerPromises: Promise<number[]>[] = [];
  // Split dataset into {dataLength}/{chunkSize} parts and create workers for each of the chunks
  for (let i = 0; i < numbers.length; i += chunkSize) {
    const chunk = numbers.slice(i, i + chunkSize);
    workerPromises.push(createWorker(chunk));
  }
  // Wait all workers to complete their tasks and merge all the results
  Promise.all(workerPromises)
    .then((results) => res.status(200).json(results.flat()))
    .catch((err) => console.log("err:", err));
};

// Find primes only with one worker for comparison
const findPrimesSingleWorker = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body: RequestModel = req.body;
  const numbers = body.data;

  const workerPromises: Promise<number[]>[] = [];
  // Create one worker responsible with all the dataset
  workerPromises.push(createWorker(numbers));
  Promise.all(workerPromises)
    .then((results) => res.status(200).json(results.flat()))
    .catch((err) => console.log("err:", err));
};
export default { findPrimesMultiThread, findPrimesSingleWorker };
