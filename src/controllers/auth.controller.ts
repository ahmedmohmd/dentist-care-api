import { RequestHandler } from "express";
import authService from "../services/auth.service";
import patientsService from "../services/patients.service";
import { SignIn } from "../types/auth.types";
import { CreateModerator } from "../types/moderators.types";
import { CreatePatient } from "../types/patients.types";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import authValidator from "../validators/auth.validator";
import patientsValidator from "../validators/patient.validator";

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
      (req.body as SignIn).password,
      (req.body as SignIn).role
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

const signUp: RequestHandler = async (req, res, next) => {
  try {
    const patientDataValidationResult: any =
      patientsValidator.CreatePatient.safeParse(req.body as CreatePatient);

    // Check Patient validity
    for (const key of Object.keys(patientDataValidationResult)) {
      if (!patientDataValidationResult[key]) {
        return customResponseUtil.errorResponse(
          res,
          HttpCode.BAD_REQUEST,
          "Patient is not Valid, Please try again!"
        );
      }
    }

    const targetPatient = await patientsService.getPatientByEmail(
      req.body.email
    );

    if (targetPatient) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Patient is already Exists!"
      );
    }

    await patientsService.createPatient(req.body);

    return customResponseUtil.successResponse(
      res,
      HttpCode.CREATED,
      "Patient created successfully"
    );
  } catch (error) {
    next(error);
  }
};

export default { signIn, signUp };
