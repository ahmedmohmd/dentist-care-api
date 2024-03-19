import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign-in", authController.signIn);

export default router;
