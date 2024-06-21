import { Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import constantsConfig from '../../config/constants.config'

const handleDocs = (app: Application) => {
  const specs = swaggerJsdoc(constantsConfig.swaggerConfigOptions)
  app.use('/api/api-docs', swaggerUi.serve)
  app.get('/api/api-docs', swaggerUi.setup(specs))
}

export default handleDocs
