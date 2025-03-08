const express = require("express");
const User = require("../models/User");
const bcrypt=require("bcryptjs")
const router = express.Router();

// ✅ Create Default Admin (Only Runs Once)
router.get("/", async (req, res) => {
    try {
        const adminExists = await User.findOne({ email: "gowtham@gmail.com" });
        if (adminExists) {
            return res.json({ message: "Admin already exists" });
        }
        const hashedPassword = await bcrypt.hash("abc@123", 10);
        const admin = new User({
            username: "gowtham",
            email: "gowtham@gmail.com",
            password: hashedPassword,
            mobile: "7793954145",
            roles: "admin",
        });

        await admin.save();
        res.json({ message: "Admin created successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
