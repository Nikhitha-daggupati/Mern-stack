const express = require("express");
const router = express.Router();

const CodingPerformance = require("../models/CodingPerformance");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// ================= STUDENT ADD PERFORMANCE =================

router.post("/add",
    authMiddleware,
    roleMiddleware("student"),
    async (req, res) => {

        const { platform, problemsSolved, rating } = req.body;

        const performanceScore = (problemsSolved * 2) + rating;

        const record = new CodingPerformance({
            studentId: req.user.id,
            platform,
            problemsSolved,
            rating,
            performanceScore
        });

        await record.save();

        res.json({ message: "Performance Added", performanceScore });
});


// ================= STUDENT VIEW OWN =================

router.get("/my",
    authMiddleware,
    roleMiddleware("student"),
    async (req, res) => {

        const data = await CodingPerformance.find({
            studentId: req.user.id
        });

        res.json(data);
});


// ================= FACULTY VIEW ALL =================

router.get("/all",
    authMiddleware,
    roleMiddleware("faculty"),
    async (req, res) => {

        const data = await CodingPerformance
            .find()
            .populate("studentId", "name email")
            .sort({ performanceScore: -1 });

        res.json(data);
});


// ================= ADMIN ANALYTICS =================

router.get("/analytics",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {

        const totalStudents = await CodingPerformance.distinct("studentId");

        const averageScore = await CodingPerformance.aggregate([
            {
                $group: {
                    _id: null,
                    avgScore: { $avg: "$performanceScore" }
                }
            }
        ]);

        res.json({
            totalStudents: totalStudents.length,
            averagePerformanceScore: averageScore[0]?.avgScore || 0
        });
});

module.exports = router;