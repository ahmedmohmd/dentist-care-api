import express from "express";
import authController from "../controllers/auth.controller";
import { patientsMiddleware } from "../middleware/patients.middleware";

const router = express.Router();

router.post("/sign-in", authController.signIn);
router.post(
  "/sign-up",
  patientsMiddleware.validateCreatePatient,
  authController.signUp
);

export default router;
