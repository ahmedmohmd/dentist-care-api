import { RequestHandler } from "express";
import patientsService from "../services/patients.service";
import { CreatePatient, UpdatePatient } from "../types/patients.types";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import patientsValidator from "../validators/patient.validator";

const getAllPatients: RequestHandler = async (req, res, next) => {
  try {
    const allPatients = await patientsService.getAllPatients();

    return customResponseUtil.successResponse(res, HttpCode.OK, allPatients);
  } catch (error) {
    next(error);
  }
};

const getSinglePatient: RequestHandler<{ patientId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const patientId = +req.params.patientId;

    if (!patientId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Patient ID parameter"
      );
    }

    const targetPatient = await patientsService.getSinglePatient(patientId);

    if (!targetPatient) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Patient not found!"
      );
    }

    return customResponseUtil.successResponse(res, HttpCode.OK, targetPatient);
  } catch (error) {
    next(error);
  }
};

const updatePatient: RequestHandler<{ patientId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const patientId = +req.params.patientId;

    if (!patientId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Patient ID parameter"
      );
    }

    const targetPatient = await patientsService.getSinglePatient(patientId);

    if (!targetPatient) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Patient not found"
      );
    }

    const patientDataValidationResult: any =
      patientsValidator.UpdatePatient.safeParse(req.body);

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

    await patientsService.updatePatient(patientId, req.body as UpdatePatient);

    return customResponseUtil.successResponse(
      res,
      HttpCode.CREATED,
      "Patient Updated Successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deletePatient: RequestHandler<{ patientId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const patientId = +req.params.patientId;

    if (!patientId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Patient ID parameter"
      );
    }

    const targetPatient = await patientsService.deletePatient(patientId);

    if (!targetPatient) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Patient not found"
      );
    }

    return customResponseUtil.successResponse(
      res,
      HttpCode.NO_CONTENT,
      "Patient Deleted Successfully"
    );
  } catch (error) {
    next(error);
  }
};

export default {
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
};
