import 'dotenv/config'
import express from 'express'
import 'express-async-errors'

import constantsConfig from '../config/constants.config'
import handleCompression from './startup/handle-compression'
import handleCors from './startup/handle-cors'
import connectDB from './startup/handle-db-connection'
import handleDocs from './startup/handle-docs'
import handleRateLimiting from './startup/handle-rate-limiting'
import handleRoutes from './startup/handle-routes'

const app = express()

// global configs
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app configs
handleCors(app)
handleRateLimiting(app)
handleCompression(app)

// api docs
handleDocs(app)
handleRoutes(app)
// db
connectDB()

// bootstrap func
const PORT = Number(process.env.PORT || constantsConfig.port)

async function bootstrap() {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
  })
}

bootstrap()
