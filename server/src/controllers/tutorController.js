// server/controllers/tutorController.js
import { Tutor } from "../models/Tutor.js";
import { isAdminRequest } from "../utils/auth.js";
import { withMaskedPhone } from "../utils/mask.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getApprovedTutors = asyncHandler(async (req, res) => {
  const tutors = await Tutor.find({ status: "approved" }).select("-password").sort({ createdAt: -1 });
  const admin = isAdminRequest(req);
  return res.json(withMaskedPhone(tutors, "phone", !admin));
});

export const getPendingTutors = asyncHandler(async (_req, res) => {
  const tutors = await Tutor.find({ status: "pending" }).select("-password").sort({ createdAt: -1 });
  return res.json(tutors);
});

export const approveTutor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tutor = await Tutor.findByIdAndUpdate(id, { status: "approved" }, { new: true }).select("-password");
  if (!tutor) return res.status(404).json({ message: "Tutor not found" });
  return res.json({ message: "Tutor approved", tutor });
});

export const deleteTutor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tutor = await Tutor.findByIdAndDelete(id);
  if (!tutor) return res.status(404).json({ message: "Tutor not found" });
  return res.json({ message: "Tutor deleted" });
});

export const getTutorProfile = asyncHandler(async (req, res) => {
  return res.json(req.tutor);
});