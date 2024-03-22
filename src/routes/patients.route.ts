import express from "express";
import patientsController from "../controllers/patients.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR"]),
  patientsController.getAllPatients
);

router.get(
  "/:patientId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR", "PATIENT"]),
  patientsController.getSinglePatient
);

router.patch(
  "/:patientId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["PATIENT"]),
  patientsController.updatePatient
);

router.delete(
  "/:patientId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR", "PATIENT"]),
  patientsController.deletePatient
);

export default router;
