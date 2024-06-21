import { Request, Response } from 'express'
import constantsConfig from '../../config/constants.config'
import customResponseUtil from './custom-response.util'
import HttpCode from './http-status-code.util'

/**
 * Validates and parses the query parameters for checking checkups.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {any} an object containing skip, take, and sortingOrder properties
 */
const checkCheckupsQueryParams = (req: Request, res: Response): any => {
  const { page = '1', limit = constantsConfig.limitParam.toString(), sort = 'desc' } = req.query

  const parsedPage = parseInt(page.toString(), 10)
  const parsedLimit = parseInt(limit.toString(), 10)

  if (isNaN(parsedPage) || isNaN(parsedLimit)) {
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, 'Page and Limit should be numbers')
  }

  if (sort !== 'asc' && sort !== 'desc') {
    return customResponseUtil.errorResponse(res, HttpCode.BAD_REQUEST, "Sort parameter should be 'asc' or 'desc'")
  }

  const skip = (parsedPage - 1) * constantsConfig.limitParam
  const sortingOrder = sort === 'asc' ? 'asc' : 'desc'
  const take = parsedLimit || constantsConfig.limitParam

  return { skip, take, sortingOrder }
}

export default checkCheckupsQueryParams
