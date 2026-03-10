import CompanyCart from "../models/companycart.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "company_carts" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Create a new company cart
export const createCompanyCart = async (req, res) => {
  try {
    const {
      companyId,
      companyName,
      experience,
      location,
      specialization,
      rating,
      features,
      verified,
      category,
    } = req.body;

    //  Prevent duplicate cart
    const existingCart = await CompanyCart.findOne({ companyId });
    if (existingCart) {
      return res
        .status(400)
        .json({ message: "Cart already exists for this company" });
    }

    let imageUrl = null;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const newCart = new CompanyCart({
      companyId,
      companyName,
      experience,
      location,
      specialization,
      rating: rating || 5,
      features: features ? JSON.parse(features) : [],
      verified: verified === "true",
      category,
      image: imageUrl,
    });

    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create company cart",
      error: error.message,
    });
  }
};

// Get all company carts
export const getCompanyCarts = async (req, res) => {
  try {
    const carts = await CompanyCart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch company carts",
      error: error.message,
    });
  }
};

// Get a company cart by MongoDB _id
export const getCompanyCartById = async (req, res) => {
  try {
    const cart = await CompanyCart.findById(req.params.id);
    if (!cart)
      return res.status(404).json({ message: "Company cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch company cart",
      error: error.message,
    });
  }
};

//  Get a company cart by companyId 
export const getCompanyCartByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;
    const cart = await CompanyCart.findOne({ companyId });
    if (!cart)
      return res.status(404).json({ message: "Company cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch company cart by companyId",
      error: error.message,
    });
  }
};

// Update a company cart
export const updateCompanyCart = async (req, res) => {
  try {
    const cart = await CompanyCart.findById(req.params.id);
    if (!cart)
      return res.status(404).json({ message: "Company cart not found" });

    const {
      experience,
      location,
      specialization,
      rating,
      features,
      verified,
      category,
    } = req.body;

    cart.experience = experience || cart.experience;
    cart.location = location || cart.location;
    cart.specialization = specialization || cart.specialization;
    cart.rating = rating || cart.rating;
    cart.features = features ? JSON.parse(features) : cart.features;
    cart.verified =
      verified !== undefined ? verified === "true" : cart.verified;
    cart.category = category || cart.category;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      cart.image = uploadResult.secure_url;
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update company cart",
      error: error.message,
    });
  }
};

// Delete a company cart
export const deleteCompanyCart = async (req, res) => {
  try {
    const cart = await CompanyCart.findById(req.params.id);
    if (!cart)
      return res.status(404).json({ message: "Company cart not found" });

    await cart.deleteOne();
    res.status(200).json({ message: "Company cart deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete company cart",
      error: error.message,
    });
  }
};
