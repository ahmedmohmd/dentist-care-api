import express from "express";
import adminController from "../controllers/admins.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";

const router = express.Router();

router.get(
  "/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN"]),
  adminController.getSingleAdmin
);

router.post(
  "/convert-to-admin/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN"]),
  adminController.convertToAdmin
);

router.post(
  "/convert-to-moderator/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN"]),
  adminController.convertToModerator
);

router.patch(
  "/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN"]),
  adminController.updateAdmin
);

router.delete(
  "/:adminId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN"]),
  adminController.deleteAdmin
);

export default router;
