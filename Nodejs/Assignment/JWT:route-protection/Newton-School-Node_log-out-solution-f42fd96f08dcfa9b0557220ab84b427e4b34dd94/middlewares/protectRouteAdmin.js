const jwt = require('jsonwebtoken');

const JWT_SECRET = 'newtonSchool';

/*
Write a middleware function that checks if the user is an admin/superadmin, the token should be passed in the authorization header, the middle should return a 403 status code if the user is not an admin/superadmin and a 401 status code if the token is invalid or missing.

Possible Cases: 
1. Token is missing : { message: 'Authentication failed: Missing token.', status: "Error"}
2. Token is invalid : { message: 'Authentication failed: Invalid token.' , status: "Error"}
3. User is not an admin : { message: 'Authorization failed: User is not an admin.', status: "Error" }
*/
function protectAdminRoutes(req, res, next) {
    const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: Missing token.', status: "Error"});
  }

  try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!['superadmin', 'admin'].includes(decodedToken.role)) {
      return res.status(403).json({ message: 'Authorization failed: User is not an admin.', status: "Error" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token.' , status: "Error"});
  }
}

// Export the middleware function
module.exports = protectAdminRoutes;