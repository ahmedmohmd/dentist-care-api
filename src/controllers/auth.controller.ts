import { RequestHandler } from "express";
import authService from "../services/auth.service";
import { SignIn } from "../types/auth.types";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import authValidator from "../validators/auth.validator";

const signIn: RequestHandler = async (req, res, next) => {
  try {
    const signInDataValidationResult: any = authValidator.SignIn.safeParse(
      req.body
    );

    for (const key of Object.keys(signInDataValidationResult)) {
      if (!signInDataValidationResult[key]) {
        return customResponseUtil.errorResponse(
          res,
          HttpCode.BAD_REQUEST,
          "Email or Password is not Valid, Please try again!"
        );
      }
    }

    const token = await authService.signIn(
      (req.body as SignIn).email,
      (req.body as SignIn).password
    );

    if (!token) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Email or Password."
      );
    }

    return customResponseUtil.successResponse(res, HttpCode.OK, {
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default { signIn };
