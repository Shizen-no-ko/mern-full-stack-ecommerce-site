// Unused
const checkAuthorizedToEdit = (req, res, next) => {
    if (req.params.id === req.user.id || req.user.isAdministrator) {
        next();
    }
    else {
        return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    }
}

module.exports = checkAuthorizedToEdit;