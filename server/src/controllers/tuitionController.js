// server/controllers/tuitionController.js
import { TuitionPost } from "../models/TuitionPost.js";
import { isAdminRequest } from "../utils/auth.js";
import { withMaskedPhone } from "../utils/mask.js";
import { isValidIndianPhone, normalizePhone, sanitizeText } from "../utils/validation.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTuitionPost = asyncHandler(async (req, res) => {
  const { parentName, contactNumber, subjectClass, location, budget, additionalDetails } = req.body;

  if (!parentName || !contactNumber || !subjectClass || !location) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  if (!isValidIndianPhone(contactNumber)) {
    return res.status(400).json({ message: "Please enter a valid 10-digit contact number" });
  }

  const post = await TuitionPost.create({
    parentName: sanitizeText(parentName, 80),
    contactNumber: normalizePhone(contactNumber),
    subjectClass: sanitizeText(subjectClass, 120),
    location: sanitizeText(location, 120),
    budget: sanitizeText(budget || "", 80),
    additionalDetails: sanitizeText(additionalDetails || "", 600),
  });

  return res.status(201).json({ message: "Tuition requirement posted", post });
});

export const getAllTuitionPosts = asyncHandler(async (req, res) => {
  const posts = await TuitionPost.find().sort({ createdAt: -1 });
  const admin = isAdminRequest(req);
  return res.json(withMaskedPhone(posts, "contactNumber", !admin));
});

export const deleteTuitionPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await TuitionPost.findByIdAndDelete(id);
  if (!post) return res.status(404).json({ message: "Tuition post not found" });
  return res.json({ message: "Tuition post deleted" });
});