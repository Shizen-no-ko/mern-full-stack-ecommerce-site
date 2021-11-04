const router = require('express').Router();

const tokenAuth = require('../middleware/tokenAuth');
const checkAuthorizedToEdit = require('../middleware/checkAuthorizedToEdit');


router.get('/test', (req, res) => {
    res.send("Test Works");
});

router.put('/:id', tokenAuth, checkAuthorizedToEdit, (req, res) => {
    res.send('Middleware Working');
});

router.patch('/:id', tokenAuth, checkAuthorizedToEdit, (req, res) => {
    res.send('Middleware Working');
});

router.delete('/:id', tokenAuth, checkAuthorizedToEdit, (req, res) => {
    res.send('Middleware Working');
});


module.exports = router;

