const express = require('express');
const app = express();
const router = express.Router();
const config = require('config.json');
const jwt = require('jsonwebtoken');




router.get('/', (req, res) => {
    if (req.cookies.auth) {
        res.render('index', { title: "landing_page", auth: req.cookies.auth });
    } else {
        res.render('index', { title: "landing_page", auth: "false" });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: "login_page" });
})

router.get('/register', (req, res) => {
    res.render('signup', { title: "signup_page" });
})

router.get('/dashboard', (req, res) => {
    // console.log("cookie is the game",req.cookies.auth);
    if (req.cookies.auth) {
        jwt.verify(req.cookies.auth.token, config.secret, function(err, decoded) {
            if (!err) {
                data = {
                    username: req.cookies.auth.firstName,
                    email: req.cookies.auth.username
                };
                let token = req.cookies.auth.token;
                res.render("dashboard", { data: data, token: token })
            } else {
                res.redirect("/");
            }
        });
    } else {
        res.redirect("/");

    }
})
router.get('/logout', (req, res) => {
    res.clearCookie("auth");
    res.status(200).redirect('/')
})

module.exports = router;