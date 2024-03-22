import express from "express";

import checkupsController from "../controllers/checkups.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR", "PATIENT"]),
  checkupsController.getAllCheckups
);

router.get(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR", "PATIENT"]),
  checkupsController.getSingleCheckup
);

router.post(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["PATIENT"]),
  checkupsController.createCheckup
);

router.patch(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["PATIENT"]),
  checkupsController.updateCheckup
);

router.delete(
  "/:checkupId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR", "PATIENT"]),
  checkupsController.deleteCheckup
);

export default router;
