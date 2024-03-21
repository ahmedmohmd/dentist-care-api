import { RequestHandler } from "express";
import moderatorsService from "../services/moderators.service";
import { CreateModerator, UpdateModerator } from "../types/moderators.types";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import moderatorsValidator from "../validators/moderators.validator";

const getAllModerators: RequestHandler = async (req, res, next) => {
  try {
    const allModerators = await moderatorsService.getAllModerators();

    return customResponseUtil.successResponse(res, HttpCode.OK, allModerators);
  } catch (error) {
    next(error);
  }
};

const getSingleModerator: RequestHandler<{ moderatorId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const moderatorId = +req.params.moderatorId;

    if (!moderatorId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Moderator ID parameter"
      );
    }

    const targetModerator = await moderatorsService.getSingleModerator(
      moderatorId
    );

    if (!targetModerator) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Moderator not found!"
      );
    }

    return customResponseUtil.successResponse(
      res,
      HttpCode.OK,
      targetModerator
    );
  } catch (error) {
    next(error);
  }
};

const createModerator: RequestHandler = (req, res, next) => {
  try {
    const moderatorDataValidationResult: any =
      moderatorsValidator.CreateModerator.safeParse(
        req.body as CreateModerator
      );

    // Check Moderator validity
    for (const key of Object.keys(moderatorDataValidationResult)) {
      if (!moderatorDataValidationResult[key]) {
        return customResponseUtil.errorResponse(
          res,
          HttpCode.BAD_REQUEST,
          "Moderator is not Valid, Please try again!"
        );
      }
    }

    return customResponseUtil.successResponse(
      res,
      HttpCode.CREATED,
      "Moderator created successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateModerator: RequestHandler<{ moderatorId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const moderatorId = +req.params.moderatorId;

    if (!moderatorId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Moderator ID parameter"
      );
    }

    const targetModerator = await moderatorsService.getSingleModerator(
      moderatorId
    );

    if (!targetModerator) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Moderator not found"
      );
    }

    const moderatorDataValidationResult: any =
      moderatorsValidator.UpdateModerator.safeParse(req.body);

    // Check Moderator validity
    for (const key of Object.keys(moderatorDataValidationResult)) {
      if (!moderatorDataValidationResult[key]) {
        return customResponseUtil.errorResponse(
          res,
          HttpCode.BAD_REQUEST,
          "Moderator is not Valid, Please try again!"
        );
      }
    }

    await moderatorsService.updateModerator(
      moderatorId,
      req.body as UpdateModerator
    );

    return customResponseUtil.successResponse(
      res,
      HttpCode.CREATED,
      "Moderator Updated Successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteModerator: RequestHandler<{ moderatorId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const moderatorId = +req.params.moderatorId;

    if (!moderatorId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Moderator ID parameter"
      );
    }

    const targetModerator = await moderatorsService.deleteModerator(
      moderatorId
    );

    if (!targetModerator) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Moderator not found"
      );
    }

    return customResponseUtil.successResponse(
      res,
      HttpCode.NO_CONTENT,
      "Moderator Deleted Successfully"
    );
  } catch (error) {
    next(error);
  }
};

export default {
  getAllModerators,
  getSingleModerator,
  createModerator,
  updateModerator,
  deleteModerator,
};
