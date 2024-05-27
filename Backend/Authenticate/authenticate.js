const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;


const generateToken = (email) => {
    const payload = { email };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};
const authenticate = (req, res, next) => {
    
    
    const token = req.headers.authorization;
    
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, secret, { ignoreExpiration: false }, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            } else {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }

        req.user = decoded; // Attach decoded user information to the request object
        
        next(); // Proceed to the next middleware
    });
    
};

module.exports = { authenticate, generateToken };