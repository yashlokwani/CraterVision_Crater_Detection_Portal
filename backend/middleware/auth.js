const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
}; 