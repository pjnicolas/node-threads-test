const { parentPort, workerData } = require('worker_threads')
const { slowFunction } = require('./benchmark')

const result = slowFunction(workerData)
parentPort.postMessage(result)
