// controllers/webhooks.js
import { Webhook } from "svix";
import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";

// Clerk webhook handler
export const handleClerkWebhook = async (req, res) => {
  try {
    // Check if webhook secret is configured
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      console.error("❌ CLERK_WEBHOOK_SECRET is not configured");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // 1️⃣ Verify the webhook signature
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Get the raw body if available, otherwise use the parsed body
    const payload = req.rawBody ? req.rawBody.toString() : JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Check if required headers are present
    if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
      console.error("❌ Missing required Svix headers");
      return res.status(400).json({ error: "Missing required headers" });
    }

    let evt;
    try {
      // Verify & parse the event
      evt = wh.verify(payload, headers);
    } catch (err) {
      console.error("❌ Webhook verification failed:", err.message);
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    // 2️⃣ Handle event types
    switch (evt.type) {
      case "user.created": {
        const { id, first_name, last_name, email_addresses, image_url } = evt.data;
        const email = email_addresses && email_addresses.length > 0 
          ? email_addresses[0].email_address 
          : "";

        if (!email) {
          console.error("❌ No email address provided for new user");
          break;
        }

        // Check if user already exists by email or Clerk ID
        const existingUser = await User.findOne({ 
          $or: [{ email }, { clerkId: id }] 
        });
        
        if (!existingUser) {
          // Generate a custom user ID (like CLI-0001)
          const userCount = await User.countDocuments();
          const userId = `USER-${String(userCount + 1).padStart(4, '0')}`;
          
          const newUser = new User({
            clerkId: id,
            userId: userId,
            firstName: first_name || "",
            lastName: last_name || "",
            email: email.toLowerCase(),
            imageUrl: image_url || "",
            role: "client", // Default role
            status: "active",
          });

          await newUser.save();
          console.log(`✅ New user saved: ${email} with ID ${userId}`);
        } else {
          console.log(`ℹ️ User already exists: ${email}`);
        }
        break;
      }

      case "user.updated": {
        const { id, first_name, last_name, email_addresses, image_url } = evt.data;
        const email = email_addresses && email_addresses.length > 0 
          ? email_addresses[0].email_address 
          : "";

        // Find user by Clerk ID
        const user = await User.findOne({ clerkId: id });
        
        if (user) {
          const updateData = {};
          if (first_name) updateData.firstName = first_name;
          if (last_name) updateData.lastName = last_name;
          if (email) updateData.email = email.toLowerCase();
          if (image_url) updateData.imageUrl = image_url;
          
          const updatedUser = await User.findByIdAndUpdate(
            user._id,
            updateData,
            { new: true, runValidators: true }
          );

          console.log(`🔄 User updated: ${updatedUser.email}`);
        } else {
          console.log(`⚠️ User not found for update: ${id}`);
          
          // If user not found but we have email, try to create
          if (email) {
            const userCount = await User.countDocuments();
            const userId = `USER-${String(userCount + 1).padStart(4, '0')}`;
            
            const newUser = new User({
              clerkId: id,
              userId: userId,
              firstName: first_name || "",
              lastName: last_name || "",
              email: email.toLowerCase(),
              imageUrl: image_url || "",
              role: "client",
              status: "active",
            });

            await newUser.save();
            console.log(`✅ New user created from update event: ${email}`);
          }
        }
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;
        
        // Try to find by Clerk ID first
        let deletedUser = await User.findOneAndDelete({ clerkId: id });
        
        // If not found by Clerk ID, try by MongoDB _id
        if (!deletedUser) {
          deletedUser = await User.findByIdAndDelete(id);
        }
        
        if (deletedUser) {
          console.log(`🗑️ User deleted: ${deletedUser.email}`);
        } else {
          console.log(`⚠️ User not found for deletion: ${id}`);
        }
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${evt.type}`);
    }

    // 3️⃣ Respond with success
    res.status(200).json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
};