const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const path = require("path");
require("./config/passportSetup");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // ✅ Ensure body parsing
app.use(cookieParser());

// ✅ Enable CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// ✅ Session & Passport Setup BEFORE Routes
app.use(
    session({
        secret: process.env.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Serve static images from uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Register Routes AFTER Middleware
app.use("/api/auth", authRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
