const mongoose = require("mongoose");

const profileUpdateSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    newData: Object,

    proofFile: String,

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("ProfileUpdateRequest", profileUpdateSchema);