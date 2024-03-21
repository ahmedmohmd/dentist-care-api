import { RequestHandler } from "express";
import adminService from "../services/admins.service";
import moderatorsService from "../services/moderators.service";
import { UpdateAdmin } from "../types/admins.types";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";
import adminValidator from "../validators/admins.validator";

const getSingleAdmin: RequestHandler<{ adminId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const adminId = +req.params.adminId;

    if (!adminId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Admin ID parameter"
      );
    }

    const targetAdmin = await adminService.getSingleAdmin(adminId);

    if (!targetAdmin) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Admin not found"
      );
    }

    return customResponseUtil.successResponse(res, HttpCode.OK, targetAdmin);
  } catch (error) {
    next(error);
  }
};

const updateAdmin: RequestHandler<{ adminId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const adminId = +req.params.adminId;

    if (!adminId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Admin ID parameter"
      );
    }

    const targetAdmin = await adminService.getSingleAdmin(adminId);

    if (!targetAdmin) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Admin not found"
      );
    }

    const adminDataValidationResult: any = adminValidator.UpdateAdmin.safeParse(
      req.body
    );

    // Check Admin validity
    for (const key of Object.keys(adminDataValidationResult)) {
      if (!adminDataValidationResult[key]) {
        return customResponseUtil.errorResponse(
          res,
          HttpCode.BAD_REQUEST,
          "Admin is not Valid, Please try again!"
        );
      }
    }

    await adminService.updateAdmin(adminId, req.body as UpdateAdmin);

    return customResponseUtil.successResponse(
      res,
      HttpCode.CREATED,
      "Admin Updated Successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteAdmin: RequestHandler<{ adminId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const adminId = +req.params.adminId;

    if (!adminId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Admin ID parameter"
      );
    }

    const targetAdmin = await adminService.getSingleAdmin(adminId);

    if (!targetAdmin) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Admin not found"
      );
    }

    return customResponseUtil.successResponse(
      res,
      HttpCode.NO_CONTENT,
      "Admin Deleted Successfully"
    );
  } catch (error) {
    next(error);
  }
};

const convertToAdmin: RequestHandler<{ moderatorId: string }> = async (
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

    await adminService.convertToAdmin(moderatorId);

    return customResponseUtil.successResponse(
      res,
      HttpCode.CREATED,
      "User converted to Admin Successfully"
    );
  } catch (error) {
    next(error);
  }
};

const convertToModerator: RequestHandler<{ adminId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const adminId = +req.params.adminId;

    if (!adminId) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.BAD_REQUEST,
        "Invalid Admin ID parameter"
      );
    }

    const targetAdmin = await adminService.getSingleAdmin(adminId);

    if (!targetAdmin) {
      return customResponseUtil.errorResponse(
        res,
        HttpCode.NOT_FOUND,
        "Admin not found"
      );
    }

    await adminService.convertToModerator(adminId);

    return customResponseUtil.successResponse(
      res,
      HttpCode.CREATED,
      "User converted to Moderator Successfully"
    );
  } catch (error) {
    next(error);
  }
};

export default {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  convertToAdmin,
  convertToModerator,
};
