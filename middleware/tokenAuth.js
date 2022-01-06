const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
    const token = req.headers.token;
    console.log("TOKEN ISSS");
    console.log(token);
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token" }] });
    }

    jwt.verify(token.substring(7), process.env.JWT_SECRET, (err, decoded) => {
        // handles malformed tokens
        if (err) {
            console.log("ERROR IS:")
            console.log(err);
            return res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
        }
        req.user = decoded.user;
    });
    next();
}

module.exports = tokenAuth;