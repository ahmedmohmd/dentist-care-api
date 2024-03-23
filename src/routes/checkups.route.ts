import express from "express";

import config from "../../config/config";
import checkupsController from "../controllers/checkups.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";

const router = express.Router();

router.get(
  "/all",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    config.userRole.ADMIN,
    config.userRole.MODERATOR,
  ]),
  checkupsController.getAllCheckups
);

router.get(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    config.userRole.ADMIN,
    config.userRole.MODERATOR,
    config.userRole.PATIENT,
  ]),
  checkupsController.getAllCheckups
);

router.get(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    config.userRole.ADMIN,
    config.userRole.MODERATOR,
    config.userRole.PATIENT,
  ]),
  checkupsController.getSingleCheckup
);

router.post(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([config.userRole.PATIENT]),
  checkupsController.createCheckup
);

router.patch(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([config.userRole.PATIENT]),
  checkupsController.updateCheckup
);

router.delete(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    config.userRole.ADMIN,
    config.userRole.MODERATOR,
    config.userRole.PATIENT,
  ]),
  checkupsController.deleteCheckup
);

export default router;
