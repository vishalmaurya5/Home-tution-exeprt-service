import express from "express";
import { adminCheck, adminLogin, tutorLogin, tutorRegister } from "../controllers/authController.js";
import { requireAdmin } from "../middleware/auth.js";
import { uploadAadhar } from "../middleware/upload.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/tutor/register", uploadAadhar.single("aadharCard")
    , tutorRegister);
router.post("/tutor/login", tutorLogin);
router.post("/admin/check", requireAdmin, adminCheck);

export default router;
