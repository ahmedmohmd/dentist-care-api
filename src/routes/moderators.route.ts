import express from "express";
import moderatorsController from "../controllers/moderators.controller";
import authMiddleware from "../middleware/auth.middleware";
import checkRoleMiddleware from "../middleware/check-role.middleware";

const router = express.Router();

router.get(
  "/",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["MODERATOR"]),
  moderatorsController.getAllModerators
);

router.get(
  "/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR"]),
  moderatorsController.getSingleModerator
);

router.post(
  "/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR"]),
  moderatorsController.createModerator
);

router.patch(
  "/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR"]),
  moderatorsController.updateModerator
);

router.delete(
  "/:moderatorId",
  authMiddleware.authUser,
  checkRoleMiddleware.checkRole(["ADMIN", "MODERATOR"]),
  moderatorsController.deleteModerator
);

export default router;
