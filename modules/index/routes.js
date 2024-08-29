const router = require("express").Router();
const mw = require("../../middlewares");
const controller = require("./controller");


router.get('/', (req,res, next) => {
    req.session.auth = true;
    if (req.session.auth)
        return res.redirect('/inicio')
    else
        return next()
}, controller.getLogin);

router.post('/login', controller.postLogin);
router.get('/inicio', mw.auth, controller.getInicio);
router.get('logout', controller.postLogout);

module.exports = router;