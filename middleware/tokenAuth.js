const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token" }] });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // handles malformed tokens
        if (err) {
            return res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
        }
        req.user = decoded.user;
    });
    next();
}

module.exports = tokenAuth;