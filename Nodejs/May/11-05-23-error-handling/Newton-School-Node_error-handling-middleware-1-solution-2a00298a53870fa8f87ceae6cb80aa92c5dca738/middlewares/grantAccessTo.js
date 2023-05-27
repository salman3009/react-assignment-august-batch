const jwt = require('jsonwebtoken');

const JWT_SECRET = 'newtonSchool';

function grantAccessTo(roles) {
  return function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: Missing token.', status: "Error" });
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      if (!roles.includes(decodedToken.role)) {
        return res.status(403).json({ message: 'Access Denied', status: "Error" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token.', status: "Error" });
    }
  }
}

module.exports = grantAccessTo;

