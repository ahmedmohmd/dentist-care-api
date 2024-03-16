import { RequestHandler } from "express";
import checkupsService from "../services/checkups.service";
import dailyDatesService from "../services/daily-dates.service";
import customResponse from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import checkupsValidator from "../validators/checkups.validator";

const getAllCheckups: RequestHandler = async (req, res, next) => {
  try {
    const checkups = await checkupsService.getAllCheckups();

    return customResponse.successResponse(res, HttpCode.OK, checkups);
  } catch (error) {
    next(error);
  }
};

const getSingleCheckup: RequestHandler<{ checkupId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const checkupId = +req.params.checkupId;

    if (!checkupId) {
      customResponse.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Checkup ID parameter"
      );
    }

    const checkup = await checkupsService.getSingleCheckup(checkupId);

    if (!checkup) {
      return customResponse.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Checkup not found"
      );
    }

    return customResponse.successResponse(res, HttpCode.OK, checkup);
  } catch (error) {
    next(error);
  }
};

const createCheckup: RequestHandler = async (req, res, next) => {
  try {
    const validatorResult: any = checkupsValidator.CreateCheckup.safeParse(
      req.body
    );

    // Check Checkup validity
    for (const key of Object.keys(validatorResult)) {
      if (!validatorResult[key]) {
        return customResponse.errorResponse(
          res,
          HttpCode.BAD_REQUEST,
          "Checkup is not Valid, Please try again!"
        );
      }
    }

    // Check Checkup Date
    const availableDates = await dailyDatesService.getAllDates();
    const checkAvailableDate = availableDates.find(
      (item) => item.date === req.body.date && item.available === true
    );

    if (!checkAvailableDate) {
      return customResponse.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Your Checkup Date is not available!"
      );
    }

    await dailyDatesService.takeDate(req.body.date);
    await checkupsService.createCheckup(req.body);

    return customResponse.successResponse(
      res,
      HttpCode.CREATED,
      "The Checkup was created successfully"
    );
  } catch (error) {
    next(error);
  }
};

export default { getAllCheckups, getSingleCheckup, createCheckup };
