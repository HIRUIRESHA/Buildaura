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
      resource_type: type, 
      folder: "buildaura_projects",
      use_filename: true,          
      unique_filename: false,      
      overwrite: true,             
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default cloudinary;
