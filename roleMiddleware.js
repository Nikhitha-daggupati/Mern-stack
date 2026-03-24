const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    console.log("HEADERS:", req.headers);
    
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "No token" });
    }

    // Extract token after "Bearer "
    const token = authHeader.split(" ")[1];
    console.log("TOKEN ONLY:", token);
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};
