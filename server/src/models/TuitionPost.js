import mongoose from "mongoose";

const tuitionPostSchema = new mongoose.Schema(
  {
    parentName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    subjectClass: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    budget: { type: String, default: "" },
    additionalDetails: { type: String, default: "" }
  },
  { timestamps: true }
);

export const TuitionPost = mongoose.model("TuitionPost", tuitionPostSchema);
