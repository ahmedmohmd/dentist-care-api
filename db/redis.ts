import Redis from 'ioredis'

const redisClient = new Redis({
  // port: 6379,
  // host: "127.0.0.1",
  // enableOfflineQueue: false,
})

redisClient.on('error', (err: any) => {
  console.log(err)
})

export default redisClient
