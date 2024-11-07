// Implement middleware to protect routes that require authentication. 
// For example, you can use a middleware function to verify JWT tokens:

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({ error: 'Access denied' });
    }

    try{
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken; 