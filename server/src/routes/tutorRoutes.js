import express from "express";
import {
  approveTutor,
  deleteTutor,
  getApprovedTutors,
  getPendingTutors,
  getTutorProfile
} from "../controllers/tutorController.js";
import { requireAdmin, requireTutor } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getApprovedTutors);
router.get("/pending", requireAdmin, getPendingTutors);
router.get("/me", requireTutor, getTutorProfile);
router.put("/:id/approve", requireAdmin, approveTutor);
router.delete("/:id", requireAdmin, deleteTutor);

export default router;
