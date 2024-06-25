import prisma from '../../db/prisma'
import logger from './handle-logging'

const connectDB = async () => {
  try {
    await prisma.$connect()

    logger.info('Database connected successfully!')
  } catch (error) {
    logger.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default connectDB
