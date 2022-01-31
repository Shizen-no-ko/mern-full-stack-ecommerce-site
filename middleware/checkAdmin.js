const checkAdmin = (req, res, next) => {
    const isAdmin = req.user ? req.user.isAdministrator : null;
    if (isAdmin) {
        next();
    }
    else {
        return res.status(403).json({ errors: [{ msg: "You are not authorized to edit" }] });
    }
}

module.exports = checkAdmin;