const jwt = require('jsonwebtoken');

// Token check middleware
const tokenAuth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token" }] });
    }
    // Substring removes 'Bearer' text from token
    jwt.verify(token.substring(7), process.env.JWT_SECRET, (err, decoded) => {
        // handles malformed tokens
        if (err) {
            return res.status(401).json({ errors: [{ msg: "Forbidden" }] });
        }
        req.user = decoded.user;
    });
    next();
}

module.exports = tokenAuth;