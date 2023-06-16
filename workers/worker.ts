import { workerData, parentPort } from "worker_threads";
// This script defines behaviour of every Worker created in thread
const payload: { chunk: number[] } = workerData;

const primeNumbers: number[] = [];
// Checks if a number is prime
const isPrime = (number: number) => {
  if (number > 1) {
    // looping through 2 to number-1
    for (let i = 2; i < number; i++) {
      if (number % i == 0) {
        return false;
      }
    }
    return true;
  }
  // check if number is less than 1
  else {
    return false;
  }
};
// Calculate isPrime for each of the elements in the payload
payload.chunk.forEach((num) => {
  if (isPrime(num)) {
    primeNumbers.push(num);
  }
});
// Send theresult back to main thread
parentPort?.postMessage(primeNumbers);
