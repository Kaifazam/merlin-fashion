const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check if Authorization header exists and starts with Bearer
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using your secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to next middleware/route
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
    