const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    marks: {
        type: Number,
        required: true
    },

    totalMarks: {
        type: Number,
        required: true
    },

    feedback: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
