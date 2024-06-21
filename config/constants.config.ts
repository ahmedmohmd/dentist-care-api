const limitParam = 2
const port = 3000
const cacheExpireTime = 60 * 60 * 24

const swaggerConfigOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dentist Care API',
      version: '1.0.0',
      description: 'Dentist Care API',
      contact: {
        name: 'Dentist Care API',
        url: 'https://dentistcareapi.com',
        email: 'qf9Zw@example.com'
      },
      lisence: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    servers: [
      {
        url: `http://localhost:${port}/api/`
      }
    ]
  },
  apis: ['**/*.ts'] // files containing annotations as above
}

export default {
  limitParam,
  port,
  cacheExpireTime,
  swaggerConfigOptions,
  defaultProfileImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzIri_vc-2KP7J9fuB64mP0eF9VQjaO9JEw&usqp=CAU'
}
