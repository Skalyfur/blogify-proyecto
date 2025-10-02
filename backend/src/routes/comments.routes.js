import { Router } from "express";
import { addComment } from "../controllers/comments.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/:id/comments", authMiddleware, addComment);

export default router;
