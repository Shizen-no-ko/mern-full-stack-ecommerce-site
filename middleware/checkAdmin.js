const checkAdmin = (req, res, next) => {
    console.log("GOT INTO CHECKADMIN");
    if (req.user.isAdministrator) {
        next();
    }
    else {
        return res.status(403).json({ errors: [{ msg: "You are not authorized to edit" }] });
    }
}

module.exports = checkAdmin;