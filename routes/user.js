const router = require('express').Router();

router.get('/test', (req, res) => {
    res.send("Test Works");
});

module.exports = router;

