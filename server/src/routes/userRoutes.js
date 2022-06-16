const express = require('express');
const router = express.Router();
const { middleware } = require('../middleware/middleware');
const { login, registration } = require('../controllers/userController');



router.post('/signup', registration);

router.post('/signin', login);

router.get('/welcome', middleware, (req, res) => {
    console.log("This is welcome page");
    res.send(req.rootUser);
});

router.get('/logout', middleware, async (req, res) => {
    try{
        console.log(req.rootUser);
        res.clearCookie('formToken');
        console.log("Logout Successful");
        await req.rootUser.save();
        res.redirect('/signin');
    }
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;