const path = require("path");
const { workerData } = require("worker_threads");
// To generate JS script from TS
require("ts-node").register();
require(path.resolve(__dirname, workerData.path));
