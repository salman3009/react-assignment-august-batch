const jwt = require('jsonwebtoken');
const JWT_SECRET = 'newtonSchool';

const protectUserRoutes = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Missing token.', status: 'error' });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId;
        if (req.params.id !== userId) {
            return res.status(403).json({ message: 'Access Denied', status: 'error' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token.', status: 'error' });
    }
};


module.exports = protectUserRoutes;