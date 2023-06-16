import express from "express";
import primeController from "../controllers/primes";
const router = express.Router();

// Define endpoint routes
router.post("/primes/multi", primeController.findPrimesMultiThread);
router.post("/primes/single", primeController.findPrimesSingleWorker);

export default router;
