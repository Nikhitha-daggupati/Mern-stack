const mongoose = require("mongoose");

const codingSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    platform: {
        type: String,
        required: true
    },

    problemsSolved: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    performanceScore: {
        type: Number
    }

}, { timestamps: true });

module.exports = mongoose.model("CodingPerformance", codingSchema);
