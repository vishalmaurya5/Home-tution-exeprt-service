import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

export const isCloudinaryEnabled = () =>
  Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

if (isCloudinaryEnabled()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export const uploadToCloudinaryIfEnabled = async (localFilePath) => {
  if (!isCloudinaryEnabled()) return null;
  const result = await cloudinary.uploader.upload(localFilePath, {
    folder: "home-tuition/aadhar",
    resource_type: "auto"
  });
  await fs.unlink(localFilePath).catch(() => null);
  return result.secure_url;
};
