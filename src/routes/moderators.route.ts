import express from "express";
import enumsConfig from "../../config/enums.config";
import moderatorsController from "../controllers/moderators.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";
import moderatorsMiddleware from "../middleware/moderators.middleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
  ]),
  moderatorsController.getAllModerators
);

router.get(
  "/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
  ]),
  moderatorsMiddleware.validateModeratorIdParam,
  moderatorsMiddleware.validateModeratorExistance,
  moderatorsController.getSingleModerator
);

router.post(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
  ]),
  moderatorsMiddleware.validateCreateModerator,
  moderatorsController.createModerator
);

router.patch(
  "/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
  ]),
  moderatorsMiddleware.validateModeratorIdParam,
  moderatorsMiddleware.validateModeratorExistance,
  moderatorsMiddleware.validateUpdateModerator,
  moderatorsController.updateModerator
);

router.delete(
  "/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole([
    enumsConfig.UserRole.ADMIN,
    enumsConfig.UserRole.MODERATOR,
  ]),
  moderatorsMiddleware.validateModeratorIdParam,
  moderatorsMiddleware.validateModeratorExistance,
  moderatorsController.deleteModerator
);

export default router;
