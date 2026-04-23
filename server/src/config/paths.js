import path from "path";

export const uploadsDir = path.resolve(process.env.UPLOAD_DIR || (process.env.NETLIFY ? "/tmp/uploads" : "uploads"));
