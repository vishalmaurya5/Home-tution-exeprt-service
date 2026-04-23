import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    subjects: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    aadharCardUrl: { type: String, required: true },
    address: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const Tutor = mongoose.model("Tutor", tutorSchema);
