import jwt from "jsonwebtoken";
import { Tutor } from "../models/Tutor.js";
import { getTokenFromHeader } from "../utils/auth.js";

export const requireAdmin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requireTutor = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "tutor") return res.status(403).json({ message: "Forbidden" });
    const tutor = await Tutor.findById(decoded.id).select("-password");
    if (!tutor) return res.status(401).json({ message: "Tutor not found" });
    req.user = decoded;
    req.tutor = tutor;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
