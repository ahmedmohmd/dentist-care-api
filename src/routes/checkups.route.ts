import express from "express";

import checkupsController from "../controllers/checkups.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware.authUser, checkupsController.getAllCheckups);

router.get("/:checkupId", checkupsController.getSingleCheckup);

router.post("/", checkupsController.createCheckup);

router.patch("/:checkupId", checkupsController.updateCheckup);

router.delete("/:checkupId", checkupsController.deleteCheckup);

export default router;
