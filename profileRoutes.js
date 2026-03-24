const express = require("express");
const router = express.Router();

const ProfileRequest = require("../models/ProfileUpdateRequest");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ================= STUDENT SUBMIT UPDATE =================

router.post("/submit", authMiddleware, async (req, res) => {

    const request = new ProfileRequest({
        userId: req.user.id,
        newData: req.body
    });

    await request.save();

    res.json({ message: "Request Submitted" });
});


// ================= ADMIN VIEW PENDING =================

router.get("/pending",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        const requests = await ProfileRequest.find({
            status: "Pending"
        }).populate("userId", "name email");

        res.json(requests);
});


// ================= ADMIN APPROVE =================

router.put("/approve/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        const request = await ProfileRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        request.status = "Approved";
        await request.save();

        await User.findByIdAndUpdate(
            request.userId,
            request.newData
        );

        res.json({ message: "Approved Successfully" });
});

module.exports = router;
