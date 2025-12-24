const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'Server error' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    if (!req.user.role) {
      const user = await User.findById(req.user.id).select('role');
      if (user) {
        req.user.role = user.role;
      }
    }
    req.isAuthenticated = true;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};