import { NextFunction, Request, Response } from 'express'

function httpInterceptor(excludeKeys: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send

    res.send = function (data) {
      if (typeof data === 'object' && data !== null) {
        const jsonData = JSON.parse(data)

        excludeKeys.forEach((key) => {
          if (key in jsonData) {
            delete jsonData[key]
          }
        })

        data = JSON.stringify(jsonData)
      }

      return originalSend.call(this, data)
    }

    next()
  }
}

export default httpInterceptor
