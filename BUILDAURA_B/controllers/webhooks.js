import { Webhook } from "svix";
import User from "../models/user.js";

export const handleClerkWebhook = async (req, res) => {
  try {
    // 1️⃣ Verify the webhook signature
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body; // Raw request body (string or buffer)
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify & get event data
    const evt = wh.verify(payload, headers);

    // 2️⃣ Handle event types
    if (evt.type === "user.created") {
      const { id, first_name, last_name, email_addresses, image_url } = evt.data;

      const email = email_addresses[0]?.email_address || "";

      // Prevent duplicates
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        const newUser = new User({
          _id: id, // Use Clerk's ID here (you can replace later when approved)
          firstName: first_name || "",
          lastName: last_name || "",
          email,
          imageUrl: image_url || "",
          status: "pending",
        });

        await newUser.save();
        console.log(`✅ New user saved: ${email}`);
      }
    }

    if (evt.type === "user.updated") {
      const { id, first_name, last_name, email_addresses, image_url } = evt.data;
      const email = email_addresses[0]?.email_address || "";

      await User.findByIdAndUpdate(
        id,
        {
          firstName: first_name || "",
          lastName: last_name || "",
          email,
          imageUrl: image_url || "",
        },
        { new: true }
      );

      console.log(`🔄 User updated: ${email}`);
    }

    if (evt.type === "user.deleted") {
      const { id } = evt.data;
      await User.findByIdAndDelete(id);
      console.log(`🗑️ User deleted: ${id}`);
    }

    // 3️⃣ Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(400).json({ error: "Invalid webhook signature" });
  }
};
