const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    date: Date,

    status: String

}, { timestamps:true });

module.exports = mongoose.model("Attendance", attendanceSchema);