import { Application } from 'express'
import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import redisClient from '../../db/redis'

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => redisClient.call(...args)
  })
})

const handleRateLimiting = (app: Application) => {
  app.use(limiter)
}

export default handleRateLimiting
