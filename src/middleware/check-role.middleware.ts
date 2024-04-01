import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom-request.type";
import Role from "../types/role.types";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";

const checkRole: any = (requiredRoles: Role[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole: Role = req?.user.role;

    if (requiredRoles.includes(userRole)) {
      next();
    } else {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.UNAUTHORIZED,

        "Forbidden - You do not have permission to perform this action"
      );
    }
  };
};

export default { checkRole };
