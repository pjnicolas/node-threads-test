require('dotenv').config()
const express = require('express')
const { Worker } = require('worker_threads')
const { slowFunction } = require('./benchmark')

const API_PORT = Number(process.env.API_PORT)

const app = express()

app.get('/without-threads/:n', (req, res) => {
  const n = Number(req.params.n)

  const data = slowFunction(n)
  res.status(200).send(String(data))
})

app.get('/with-threads/:n', (req, res) => {
  const n = Number(req.params.n)

  const worker = new Worker('/app/src/worker.js', { workerData: n })
  worker.on('message', (data) => {
    res.status(200).send(String(data))
  })
  worker.on('error', () => res.sendStatus(500))
  worker.on('exit', (code) => {
    if (code !== 0) {
      res.sendStatus(500)
    }
  });
})

app.listen(API_PORT, () => {
  console.log(`Api listening in ${API_PORT}`)
})
