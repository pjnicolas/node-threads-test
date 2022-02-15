require('dotenv').config()
const axios = require('axios').default

const API_PORT = Number(process.env.API_PORT)

const REPEAT_PRECISION = 3

const getTime = async (n, fn) => {
  const results = []
  for (let i = 0; i < REPEAT_PRECISION; i += 1) {
    const before = Date.now()
    const calls = Array.from({ length: n }, () => fn())
    await Promise.all(calls)
    const after = Date.now()
    results.push(after - before)
  }

  return results.reduce((prev, curr) => prev + curr, 0) / results.length
}

const formatTime = (x) => {
  const seconds = (x / 1000).toFixed(3)
  if (seconds.length < 6) {
    return `${Array.from({ length: 6 - seconds.length }, () => ' ')}${seconds}`
  }

  return seconds
}

const main = async () => {
  const withoutThreadsSingle = await getTime(1, () => axios.get(`http://localhost:${API_PORT}/without-threads/10`))
  const withoutThreadsMultiple = await getTime(14, () => axios.get(`http://localhost:${API_PORT}/without-threads/10`))
  const withThreadsSingle = await getTime(1, () => axios.get(`http://localhost:${API_PORT}/with-threads/10`))
  const withThreadsMultiple = await getTime(14, () => axios.get(`http://localhost:${API_PORT}/with-threads/10`))

  console.log('WITHOUT THREADS  1 CALL:', formatTime(withoutThreadsSingle))
  console.log('WITHOUT THREADS 12 CALL:', formatTime(withoutThreadsMultiple))
  console.log('   WITH THREADS  1 CALL:', formatTime(withThreadsSingle))
  console.log('   WITH THREADS 12 CALL:', formatTime(withThreadsMultiple))
}

main()
