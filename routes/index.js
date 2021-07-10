const express = require('express');
const router = express.Router();
const config = require('config.json');////changed =======================
const jwt = require('jsonwebtoken');////changed =======================



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
    // console.log("cookie is the game",req.cookies.auth);
    if (req.cookies.auth) {
        jwt.verify(req.cookies.auth.token, config.secret, function (err, decoded) {
            // console.log("decoded bhai yhai hai culprit", req.cookies.auth)
            if (!err) {
                data = {
                    username: req.cookies.auth.firstName,
                    email: req.cookies.auth.username
                };
                // readProduct(function (products) {
                //     readCart(function (cart) {
                //         res.render("dashboard", { data: data, cart_items: cart })
                //     })
                // })
                records = [
                    {
                        id: 1,
                        name: "Rich-Boss India Pvt Ltd. - Chirya",
                        address: "Jaipur",
                        city: "Chirya",
                        state: "Haryana"
                    },
                    {
                        id: 2,
                        name: "Rich-Boss A&C India Pvt.Ltd. - Surat",
                        address: "Surat",
                        city: "Surat",
                        state: "Gujarat"
                    },
                    {
                        id: 3,
                        name: "Rich-Boss Cement Plant -Greater Noida",
                        address: "Kanpur",
                        city: "Kanpur",
                        state: "Uttar Pradesh"
                    },
                    {
                        id: 4,
                        name: "Rich-Boss ACC Limited -Chandrapur",
                        address: "Chandrapur",
                        city: "Chandrapur",
                        state: "Maharashtra"
                    },
                    {
                        id: 5,
                        name: "Rich-Boss Cement Plant - Raseda",
                        address: "Raseda",
                        city: "Raseda",
                        state: "Chhattisgarh"
                    },
                    {
                        id: 6,
                        name: "Rich-Boss Cement Factory- Lakheri",
                        address: "Lakheri",
                        city: "Lakheri",
                        state: "Rajasthan"
                    }
                ]
                res.render("dashboard",{records:records, data:data})
            }
            else {
                res.redirect("/");
            }
        });
    }
    else {
        res.redirect("/");
    }
})
router.get('/logout', (req, res) => {
    res.clearCookie("auth");
    res.status(200).redirect('/')
})

module.exports = router;