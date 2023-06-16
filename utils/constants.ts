import os from "os";

// Get available CPU count
export const THREAD_COUNT = os.availableParallelism();
