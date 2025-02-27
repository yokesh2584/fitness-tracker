const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token contains a valid user ID
    if (!decoded.userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user and token to request object for further use
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = auth;
