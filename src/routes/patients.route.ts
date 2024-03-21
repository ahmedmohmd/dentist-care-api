import express from "express";
import patientsController from "../controllers/patients.controller";

const router = express.Router();

router.get("/", patientsController.getAllPatients);
router.get("/:patientId", patientsController.getSinglePatient);
router.patch("/:patientId", patientsController.updatePatient);
router.delete("/:patientId", patientsController.deletePatient);

export default router;
