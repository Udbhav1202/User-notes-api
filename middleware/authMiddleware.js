const jwt = require('jsonwebtoken');
// Middleware to protect routes
// middleware runs before the routes
//this one protects routes so only authenticated users can access them
const protect = (req, res, next) => {
  // req = incoming request data
  const token = req.headers.authorization?.split(' ')[1];

  // res = used to send response back
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user id to request
    req.user = decoded.id;

    // next = move to next function (route handler)
    next();  
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = protect;
