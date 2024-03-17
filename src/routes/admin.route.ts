import express from "express";
import adminController from "../controllers/admin.controller";

const router = express.Router();

router.get("/:adminId", adminController.getSingleAdmin);
router.patch("/:adminId", adminController.updateAdmin);
router.delete("/:adminId", adminController.deleteAdmin);

export default router;
