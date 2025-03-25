const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        profilePic: { type: String, default: "" }
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);