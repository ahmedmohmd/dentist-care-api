import { Application } from 'express'
import globalErrorHandler from '../controllers/global-error-handler.controller'
import adminsRouter from '../routes/admins.route'
import authRouter from '../routes/auth.route'
import checkupsRouter from '../routes/checkups.route'
import dailyDatesRouter from '../routes/daily-dates.route'
import moderatorsRouter from '../routes/moderators.route'
import patientsRouter from '../routes/patients.route'

const handleRoutes = (app: Application) => {
  app.use('/api/admins', adminsRouter)
  app.use('/api/moderators', moderatorsRouter)
  app.use('/api/patients', patientsRouter)
  app.use('/api/checkups', checkupsRouter)
  app.use('/api/daily-dates', dailyDatesRouter)
  app.use('/api/auth', authRouter)

  app.use(globalErrorHandler)
}

export default handleRoutes
