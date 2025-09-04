// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// ---------- Cloudinary Configuration ----------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---------- Upload Function ----------
/**
 * Upload a file to Cloudinary
 * @param {string} filePath - Local path of the file to upload
 * @param {"image" | "raw" | "video"} type - Resource type ("image" | "raw" | "video")
 * @returns {Promise<object>} - Cloudinary upload response
 */
export const uploadToCloudinary = async (filePath, type = "image") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: type, // "image" for images, "raw" for PDFs/docs, "video" for videos
      folder: "buildaura_projects", // optional: organize uploads in a folder
      use_filename: true,          // keep original filename
      unique_filename: false,      // don't append random string
      overwrite: true,             // overwrite if same filename exists
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// ---------- Default Export ----------
export default cloudinary;
