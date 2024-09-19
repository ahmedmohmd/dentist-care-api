import Redis from 'ioredis'
import logger from '../src/startup/handle-logging'

const redisClient = new Redis(process.env.REDIS_URL)

redisClient.on('error', (err: any) => {
  logger.error(err)
})

export default redisClient
