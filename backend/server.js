const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Enable CORS for frontend communication
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true
}));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));


app.use(express.json()); // Ensure this line is here
app.use(express.urlencoded({ extended: true })); // Also parse URL-encoded data
