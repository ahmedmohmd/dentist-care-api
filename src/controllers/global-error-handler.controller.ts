import { error } from 'console'
import type { ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'

const globalErrorHandler: ErrorRequestHandler = (err, _, res, __) => {
  if (createHttpError.isHttpError(err)) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false,
      status: err.statusCode
    })
  }

  return res.status(500).json({
    message: "Oops! Something went wrong. We're on it!",
    success: false,
    status: 500
  })
}

export default globalErrorHandler
