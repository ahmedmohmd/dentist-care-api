import express from "express";
import dailyDatesController from "../controllers/daily-dates.controller";

const router = express.Router();

router.get("/", dailyDatesController.getAllDates);

export default router;
