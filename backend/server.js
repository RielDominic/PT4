const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// Multer setup for storing images
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// MongoDB Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePic: String, // Store image path, not the image itself
});

const User = mongoose.model("User", UserSchema);

// Register Endpoint
app.post("/api/auth/register", upload.single("profilePic"), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

        const newUser = new User({ name, email, password, profilePic });
        await newUser.save();

        res.json({ message: "User registered successfully!", profilePic });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
