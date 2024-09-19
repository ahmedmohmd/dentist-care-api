import Redis from 'ioredis'
import logger from '../src/startup/handle-logging'

const redisClient = new Redis('redis://redis:6379')

redisClient.on('error', (err: any) => {
  logger.error(err)
})

export default redisClient
