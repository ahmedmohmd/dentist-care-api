import { RequestHandler } from "express";
import { UpdateAdmin } from "../dto/admins.dto";
import adminsService from "../services/admins.service";
import customResponseUtil from "../utils/custom-response.util";
import HttpCode from "../utils/http-status-code.util";

const getSingleAdmin: RequestHandler<{ adminId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const adminId = +req.params.adminId;

    const targetAdmin = await adminsService.getSingleAdmin(adminId);

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

    await adminsService.updateAdmin(adminId, req.body as UpdateAdmin);

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

    await adminsService.deleteAdmin(adminId);

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

    await adminsService.convertToAdmin(moderatorId);

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

    await adminsService.convertToModerator(adminId);

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
