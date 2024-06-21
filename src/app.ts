import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import { rateLimit } from 'express-rate-limit'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import prisma from '../db/prisma'

import constantsConfig from '../config/constants.config'
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
  windowMs: 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
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
