const jwt = require('jsonwebtoken');

const tokenAuth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({ errors: [{ msg: "Not Authorized" }] });
    }

    // try{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            // handles malformed tokens
            if(err){
                return res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
            }  
            req.user = decoded.user;
        });
        // console.log("This is req.user: ")
        // console.log(req.user);
        next();
    // }
    // catch {
    //     (err) => {
    //         console.log(err)
    //         res.status(401).json("Token is not valid");
    //     }
    // }

}


module.exports = tokenAuth;