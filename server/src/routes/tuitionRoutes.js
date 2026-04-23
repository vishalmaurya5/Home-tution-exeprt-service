import express from "express";
import { createTuitionPost, deleteTuitionPost, getAllTuitionPosts } from "../controllers/tuitionController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createTuitionPost);
router.get("/", getAllTuitionPosts);
router.delete("/:id", requireAdmin, deleteTuitionPost);

export default router;
