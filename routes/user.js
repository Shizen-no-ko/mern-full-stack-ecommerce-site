const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');

const checkAuthorized = (req, res) => {
    if(req.params.id === req.user.id || req.user.isAdministrator) {
        res.send("Authorized to edit this user");
    }
}

router.get('/test', (req, res) => {
    res.send("Test Works");
});

router.put('/:id', tokenAuth, (req, res) => {
    checkAuthorized(req, res)
});

router.patch('/:id', tokenAuth, (req, res) => {
    checkAuthorized(req, res)
});

router.delete('/:id', tokenAuth, (req, res) => {
    checkAuthorized(req, res)
});


module.exports = router;

