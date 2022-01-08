const checkAdmin = (req, res, next) => {
    if (req.user.isAdministrator) {
        next();
    }
    else {
        return res.status(403).json({ errors: [{ msg: "You are not authorized to edit" }] });
    }
}

module.exports = checkAdmin;