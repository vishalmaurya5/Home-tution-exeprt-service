import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin.js";

export const seedDefaultAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || "admin@tutionhub.com").toLowerCase();
  const rawPassword = process.env.ADMIN_PASSWORD || "admin123";
  const existing = await Admin.findOne({ email });
  if (existing) return;
  const password = await bcrypt.hash(rawPassword, 10);
  await Admin.create({ email, password });
};
