import express from "express";
import enumsConfig from "../../config/enums.config";
import adminController from "../controllers/admins.controller";
import adminsMiddleware from "../middleware/admins.middleware";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";
import moderatorsMiddleware from "../middleware/moderators.middleware";

const router = express.Router();

router.get(
  "/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminController.getSingleAdmin
);

router.post(
  "/convert-to-admin/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  moderatorsMiddleware.validateModeratorIdParam,
  moderatorsMiddleware.validateModeratorExistance,
  adminController.convertToAdmin
);

router.post(
  "/convert-to-moderator/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminController.convertToModerator
);

router.patch(
  "/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminsMiddleware.validateUpdateAdmin,
  adminController.updateAdmin
);

router.delete(
  "/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([enumsConfig.UserRole.ADMIN]),
  adminsMiddleware.validateAdminIdParam,
  adminsMiddleware.validateAdminExistance,
  adminController.deleteAdmin
);

export default router;
