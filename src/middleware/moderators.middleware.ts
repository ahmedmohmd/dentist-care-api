import { RequestHandler } from "express";
import moderatorsService from "../services/moderators.service";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import moderatorsValidator from "../validators/moderators.validator";

const validateModeratorIdParam: RequestHandler = (req, res, next) => {
  const moderatorId = +req.params.moderatorId;

  if (!moderatorId) {
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      "Invalid Moderator ID parameter"
    );
  }

  next();
};

const validateModeratorExistance: RequestHandler = async (req, res, next) => {
  try {
    const moderatorId = +req.params.moderatorId;

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

    next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateModerator: RequestHandler = (req, res, next) => {
  const validatorResult = moderatorsValidator.UpdateModerator.safeParse(
    req.body
  );

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors
      .map((error) => error.message)
      .join("; ");
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      `Moderator is not valid: [${errorMessage}]`
    );
  }

  next();
};

const validateCreateModerator: RequestHandler = async (req, res, next) => {
  const validatorResult: any = moderatorsValidator.CreateModerator.safeParse(
    req.body
  );

  if (!validatorResult.success) {
    const errorMessage = validatorResult.error.errors
      .map((error: any) => error.message)
      .join("; ");
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      `Moderator is not valid: [${errorMessage}]`
    );
  }

  const targetModerator = await moderatorsService.getModeratorByEmail(
    req.body.email
  );

  if (targetModerator) {
    return customResponseUtil.errorResponse(
      res,
      HttpCode.BAD_REQUEST,
      "Moderator already exists"
    );
  }

  next();
};

export default {
  validateModeratorExistance,
  validateModeratorIdParam,
  validateCreateModerator,
  validateUpdateModerator,
};
