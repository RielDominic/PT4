const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ✅ Ensure uploads directory exists BEFORE using multer
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure multer for file uploads 
const storage = multer.diskStorage({
    destination: uploadDir,  // Use correct path
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

// ✅ Middleware function to verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Access denied. Please login first." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.id;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token. Please login again." });
    }
};

// ✅ Register a new user with profile picture upload
router.post("/register", upload.single("profilePic"), async (req, res) => {
    const { name, email, password } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename}` : "";  // Added leading "/"

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profilePic
        });

        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        console.log("User found:", user); // 🔍 Debugging: Check user data

        // Check if the user has a password (especially if they registered via Google)
        if (!user.password) {
            return res.status(400).json({ error: "This account does not have a password. Try logging in with Google." });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000,
            path: '/'
        }).json({
            message: "Login successful",
            user: { name: user.name, email: user.email }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed. Please try again." });
    }
});

// ✅ Get all users (for dashboard)
router.get("/users", verifyToken, async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// ✅ Logout user
router.post("/logout", (req, res) => {
    res.clearCookie("token").json({ message: "Logout successful" });
});

module.exports = router;


//Google Login
const passport = require("passport");

// ✅ Google authentication route
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account" // ✅ Forces Google to ask for account selection
  })
);


// ✅ Google OAuth callback route
router.get("/google/callback", 
    passport.authenticate("google", { session: false }), // Disable session-based auth
    async (req, res) => {
      try {
        const user = req.user; // Get authenticated user
  
        if (!user) {
          return res.redirect("http://localhost:3000/login");
        }
  
        // ✅ Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
        // ✅ Set the token as an HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 3600000,
          path: "/"
        });
  
        // ✅ Redirect to dashboard after setting the token
        res.redirect("http://localhost:3000/dashboard");
      } catch (error) {
        console.error("Google Auth Error:", error);
        res.redirect("http://localhost:3000/login");
      }
    }
  );
  

// ✅ Fixed Logout Route (Handles Errors and Session Destroy)
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Handle any error
    }
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Ensure session cookie is removed
      res.redirect("http://localhost:3000"); // Redirect to homepage/login
    });
  });
});

// ✅ Get logged-in user data
router.get("/user", (req, res) => {
  res.send(req.user || null);
});

module.exports = router;