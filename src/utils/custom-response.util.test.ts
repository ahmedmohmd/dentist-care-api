import { describe, expect, it, vi } from 'vitest'
import customResponseUtil from './custom-response.util'

const response: any = {}

const status = vi.fn().mockReturnValue(response)
const json = vi.fn().mockReturnValue(response)

response.status = status
response.json = json

describe('successResponse()', () => {
  it('Should call json() method', () => {
    const statusCode = 200

    customResponseUtil.successResponse(response, statusCode)

    expect(status).toBeCalledWith(statusCode)
  })

  it('Should call json() method', () => {
    const statusCode = 200
    const data = 'message'

    customResponseUtil.successResponse(response, statusCode, data)

    const expectedResult = {
      success: true,
      data: data
    }

    expect(json).toBeCalledWith(expectedResult)
  })
})

describe('errorResponse()', () => {
  it('Should call json() method', () => {
    const statusCode = 404
    const errorMessage = 'message'

    customResponseUtil.errorResponse(response, statusCode, errorMessage)

    expect(status).toBeCalledWith(statusCode)
  })

  it('Should call json() method', () => {
    const statusCode = 404
    const errorMessage = 'message'

    customResponseUtil.errorResponse(response, statusCode, errorMessage)

    const expectedResult = {
      success: false,
      message: errorMessage
    }

    expect(json).toBeCalledWith(expectedResult)
  })
})
