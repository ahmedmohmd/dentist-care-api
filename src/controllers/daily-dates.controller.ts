import { RequestHandler } from "express";
import dailyDatesService from "../services/daily-dates.service";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";

const getAllDates: RequestHandler = async (req, res, next) => {
  try {
    const allDates = await dailyDatesService.getAllDates();

    return customResponseUtil.successResponse(res, HttpCode.OK, allDates);
  } catch (error) {
    next(error);
  }
};

const releaseAllDates: RequestHandler = async (req, res, next) => {
  try {
    await dailyDatesService.releaseAllDates();

    return customResponseUtil.successResponse(
      res,
      HttpCode.NO_CONTENT,
      "All Dates have been released successfully"
    );
  } catch (error) {
    next(error);
  }
};

export default { getAllDates, releaseAllDates };
