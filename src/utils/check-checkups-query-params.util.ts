import { Request } from 'express'
import createHttpError from 'http-errors'
import constantsConfig from '../../config/constants.config'
import { CustomRequest } from '../types/globals.type'

/**
 * Validates and parses the query parameters for checking checkups.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {any} an object containing skip, take, and sortingOrder properties
 */
const checkCheckupsQueryParams = (
  req: CustomRequest | Request
): {
  skip: number
  take: number
  sortingOrder: 'desc' | 'asc'
} => {
  const { page = '1', limit = constantsConfig.limitParam.toString(), sort = 'desc' } = (req as Request).query

  const parsedPage = parseInt(page.toString(), 10)
  const parsedLimit = parseInt(limit.toString(), 10)

  if (isNaN(parsedPage) || isNaN(parsedLimit)) {
    throw new createHttpError.BadRequest('Page and Limit should be numbers')
  }

  if (sort !== 'asc' && sort !== 'desc') {
    throw new createHttpError.BadRequest("Sort parameter should be 'asc' or 'desc'")
  }

  const skip = (parsedPage - 1) * constantsConfig.limitParam
  const sortingOrder = sort === 'asc' ? 'asc' : 'desc'
  const take = parsedLimit || constantsConfig.limitParam

  return { skip, take, sortingOrder }
}

export default checkCheckupsQueryParams
