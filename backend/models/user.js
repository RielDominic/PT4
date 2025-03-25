const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    profilePic: String // Store only the file path
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model("User", UserSchema);