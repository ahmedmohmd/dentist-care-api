import { RequestHandler } from "express";
import patientsService from "../services/patients.service";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import patientsValidator from "../validators/patients.validator";

const validatePatientExistance: RequestHandler = async (req, res, next) => {
  const patientId = +req.params.patientId;

  const targetPatient = await patientsService.getSinglePatient(patientId);

  if (!targetPatient) {
    return customResponseUtil.errorResponse(
      res,
      HttpCode.NOT_FOUND,
      "Patient not found"
    );
  }

  next();
};

const validatePatientIdParam: RequestHandler = async (req, res, next) => {
  const patientId = +req.params.patientId;

  if (!patientId) {
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      "Invalid Patient ID parameter"
    );
  }

  next();
};

const validateCreatePatient: RequestHandler = async (req, res, next) => {
  const validatorResult: any = patientsValidator.CreatePatient.safeParse(
    req.body
  );

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors
      .map((error: any) => error.message)
      .join("; ");
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      `Patient is not valid: [${errorMessage}]`
    );
  }

  const targetPatient = await patientsService.getPatientByEmail(req.body.email);

  if (targetPatient) {
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      "Patient already exists"
    );
  }

  next();
};

const validateUpdatePatient: RequestHandler = async (req, res, next) => {
  const validatorResult: any = patientsValidator.UpdatePatient.safeParse(
    req.body
  );

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors
      .map((error: any) => error.message)
      .join("; ");
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      `Patient is not valid: [${errorMessage}]`
    );
  }

  next();
};

export const patientsMiddleware = {
  validatePatientExistance,
  validatePatientIdParam,
  validateCreatePatient,
  validateUpdatePatient,
};
