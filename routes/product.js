const { body } = require('express-validator');

const router = require('express').Router();

router.post('/add', (req, res) => {
    res.send(req.body);
});


module.exports = router;