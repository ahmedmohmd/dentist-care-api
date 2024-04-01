import express from "express";
import enumsConfig from "../../config/enums.config";
import patientsController from "../controllers/patients.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";
import { patientsMiddleware } from "../middleware/patients.middleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
  ]),
  patientsController.getAllPatients
);

router.get(
  "/:patientId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT,
  ]),
  patientsMiddleware.validatePatientIdParam,
  patientsMiddleware.validatePatientExistance,
  patientsController.getSinglePatient
);

router.patch(
  "/:patientId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.PATIENT]),
  patientsMiddleware.validatePatientIdParam,
  patientsMiddleware.validatePatientExistance,
  patientsMiddleware.validateUpdatePatient,
  patientsController.updatePatient
);

router.delete(
  "/:patientId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT,
  ]),
  patientsMiddleware.validatePatientIdParam,
  patientsMiddleware.validatePatientExistance,
  patientsController.deletePatient
);

export default router;
