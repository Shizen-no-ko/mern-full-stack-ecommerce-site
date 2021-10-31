const { body } = require('express-validator');

const router = require('express').Router();

router.post('/register', (req, res) => {
    const {password, ...restOfBody} = req.body;
    res.send(restOfBody);
});

router.post('/login', (req, res) => {
    const {password, ...restOfBody} = req.body;
    res.send(restOfBody);
});



module.exports = router;