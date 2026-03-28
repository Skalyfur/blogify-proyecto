// src/routes/user.routes.js
import express from "express";
import { getProfile, updateProfile, changePassword, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.js"; // usa tu middleware existente

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete", authMiddleware, deleteUser);

export default router;
