import path from 'path'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const combinedLogPath = path.join(__dirname, '../../logs/combined.log')
const errorLogPath = path.join(__dirname, '../../logs/error.log')
const rotationLogPath = path.join(__dirname, '../../logs/application-%DATE%.log')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: errorLogPath, level: 'error' }),
    new winston.transports.File({ filename: combinedLogPath }),
    new DailyRotateFile({
      filename: rotationLogPath,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m'
    })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

export default logger
