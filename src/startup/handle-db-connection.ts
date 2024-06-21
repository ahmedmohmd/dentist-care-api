import prisma from '../../db/prisma'

const connectDB = async () => {
  try {
    await prisma.$connect()

    console.log('Database connected successfully!')
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default connectDB
