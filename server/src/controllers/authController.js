// server/controllers/authController.js
import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin.js";
import { Tutor } from "../models/Tutor.js";
import { signToken } from "../utils/auth.js";
import { uploadToCloudinaryIfEnabled } from "../utils/cloudinary.js";
import { seedDefaultAdmin } from "../utils/seedAdmin.js";
import {
  isStrongEnoughPassword,
  isValidEmail,
  isValidIndianPhone,
  normalizePhone,
  sanitizeText,
} from "../utils/validation.js";
import asyncHandler from "../utils/asyncHandler.js";

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  await seedDefaultAdmin();

  const admin = await Admin.findOne({ email: String(email).toLowerCase() });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: admin._id, role: "admin", email: admin.email });
  return res.json({
    message: "Admin login successful",
    token,
    admin: { id: admin._id, email: admin.email },
  });
});

export const tutorRegister = asyncHandler(async (req, res) => {
  const { name, email, password, phone, qualification, subjects, experience, address } = req.body;

  if (!name || !email || !password || !phone || !qualification || !subjects || !experience) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }
  if (!isStrongEnoughPassword(password)) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }
  if (!isValidIndianPhone(phone)) {
    return res.status(400).json({ message: "Please enter a valid 10-digit contact number" });
  }

  const normalizedExperience = sanitizeText(experience, 30);
  if (!/^\d+(\.\d+)?(\s*(year|years))?$/i.test(normalizedExperience)) {
    return res.status(400).json({ message: "Experience should be like 2 or 2 years" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Document file is required" });
  }

  const existing = await Tutor.findOne({ email: String(email).toLowerCase() });
  if (existing) return res.status(409).json({ message: "Tutor with this email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const cloudinaryUrl = await uploadToCloudinaryIfEnabled(req.file.path);

  const tutor = await Tutor.create({
    name: sanitizeText(name, 80),
    email: String(email).toLowerCase(),
    password: hashedPassword,
    phone: normalizePhone(phone),
    qualification: sanitizeText(qualification, 120),
    subjects: sanitizeText(subjects, 300),
    experience: normalizedExperience,
    aadharCardUrl: cloudinaryUrl || `/uploads/${req.file.filename}`,
    address: sanitizeText(address || "", 250),
  });

  return res.status(201).json({
    message: "Tutor registered successfully. Awaiting admin approval.",
    tutor: {
      id: tutor._id,
      name: tutor.name,
      email: tutor.email,
      status: tutor.status,
      aadharCardUrl: tutor.aadharCardUrl,
    },
  });
});

export const tutorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  const tutor = await Tutor.findOne({ email: String(email).toLowerCase() });
  if (!tutor) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, tutor.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: tutor._id, role: "tutor", email: tutor.email });
  return res.json({
    message: "Tutor login successful",
    token,
    tutor: {
      id: tutor._id,
      name: tutor.name,
      email: tutor.email,
      status: tutor.status,
    },
  });
});

export const adminCheck = asyncHandler(async (_req, res) => {
  return res.json({ isAdminLoggedIn: true });
});