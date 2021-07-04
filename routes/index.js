const express = require('express');
const router = express.Router();
import { app } from '../server';

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('signup');
})

router.get('/dashboard', (req, res) => {
    console.log(req.app.cookies);
    res.send("welcome");
})

module.exports = router;