import { NextFunction, Response } from 'express'
import createHttpError from 'http-errors'
import { CustomRequest } from '../types/custom-request.type'
import Role from '../types/role.types'

const checkRole = (requiredRoles: Role[]): any => {
  return (req: Request, _: Response, next: NextFunction) => {
    const userRole: Role = (req as any).user.role

    if (requiredRoles.includes(userRole)) {
      next()
    } else {
      throw new createHttpError.Forbidden('Forbidden - You do not have permission to perform this action')
    }
  }
}

export default { checkRole }
