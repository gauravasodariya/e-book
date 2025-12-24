const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

async function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: "Server error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };

    if (!req.user.role) {
      const user = await User.findById(req.user.id).select("role");
      if (user) {
        req.user.role = user.role;
      }
    }

    req.isAuthenticated = true;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Forbidden" });
    }
    return next();
  };
}

module.exports = { auth, authorize };
