const checkAdmin = (req, res, next) => {
    console.log("GOT INTO CHECKADMIN");
    if (req.user.isAdministrator) {
        next();
    }
    else {
        return res.status(403).json({ errors: [{ msg: "Forbidden" }] });
    }
}

module.exports = checkAdmin;