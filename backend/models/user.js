const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    profilePic: String // Store only the file path
});

module.exports = mongoose.model("User", UserSchema);
