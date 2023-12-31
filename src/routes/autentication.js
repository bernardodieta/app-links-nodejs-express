const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn,isNotloggedin} = require('../lib/auth');



router.get('/signup', isNotloggedin, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup',  isNotloggedin, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));
router.get('/signin', isNotloggedin, (req, res) => {
    res.render('auth/signin');
})
router.post('/signin', isNotloggedin, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get("/logout", isLoggedIn, (req, res, next) => {

    req.logOut(req.user, err => {
        if(err) return next(err);
        res.redirect("/signin");  

    });

});

module.exports = router;