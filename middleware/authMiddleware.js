const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {

        let token;

        // Check if Authorization header exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // No Token
        if (!token) {
            return res.status(401).json({
                message: "Not Authorized, Token Missing"
            });
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get User Details
        req.user = await User.findById(decoded.id).select("-password");

        next();

    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;