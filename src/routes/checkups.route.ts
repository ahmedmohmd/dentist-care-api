import express from "express";

import checkupsController from "../controllers/checkups.controller";

const router = express.Router();

router.get("/", checkupsController.getAllCheckups);

router.get("/:checkupId", checkupsController.getSingleCheckup);

router.post("/", checkupsController.createCheckup);

router.patch("/:checkupId");

router.delete("/:checkupId");

export default router;
