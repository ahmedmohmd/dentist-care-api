import express from "express";

import enumsConfig from "../../config/enums.config";
import checkupsController from "../controllers/checkups.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";

const router = express.Router();

router.get(
  "/all",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
  ]),
  checkupsController.getAllCheckups
);

router.get(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT,
  ]),
  checkupsController.getAllCheckups
);

router.get(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT,
  ]),
  checkupsController.getSingleCheckup
);

router.post(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.PATIENT]),
  checkupsController.createCheckup
);

router.patch(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.PATIENT]),
  checkupsController.updateCheckup
);

router.delete(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
    enumsConfig.UserRole.PATIENT,
  ]),
  checkupsController.deleteCheckup
);

export default router;
