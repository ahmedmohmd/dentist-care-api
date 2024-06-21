import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import prisma from '../db/prisma'

import constantsConfig from '../config/constants.config'
import redisClient from '../db/redis'
import globalErrorHandler from './controllers/global-error-handler.controller'
import adminsRouter from './routes/admins.route'
import authRouter from './routes/auth.route'
import checkupsRouter from './routes/checkups.route'
import dailyDatesRouter from './routes/daily-dates.route'
import moderatorsRouter from './routes/moderators.route'
import patientsRouter from './routes/patients.route'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  cors({
    origin: '*'
  })
)

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

app.use(limiter)

// Handle swagger docs
const specs = swaggerJsdoc(constantsConfig.swaggerConfigOptions)

app.use('/api/api-docs', swaggerUi.serve)
app.get('/api/api-docs', swaggerUi.setup(specs))

// Routes
app.use('/api/admins', adminsRouter)
app.use('/api/moderators', moderatorsRouter)
app.use('/api/patients', patientsRouter)
app.use('/api/checkups', checkupsRouter)
app.use('/api/daily-dates', dailyDatesRouter)
app.use('/api/auth', authRouter)

app.use(globalErrorHandler)

const PORT = Number(process.env.PORT || constantsConfig.port)

async function bootstrap() {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
  })
}

bootstrap()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
