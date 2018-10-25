const config = require('config');

const Router = require('express-promise-router');
const router = new Router();

router.get('/', async (req, res) => {

    res.render('home', {
        config: config
    });
});

module.exports = router;