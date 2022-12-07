const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile("login.html", { root: './public/' })
});
router.get('/register', (req, res) => {
    res.sendFile("register.html", { root: './public/' })
});
router.get('/login', (req, res) => {
    res.sendFile("login.html", { root: './public/' })
});
router.get('/front', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.sendFile("frontpage.html", { root: './public/' })
    } else {
        res.sendFile("login.html", { root: './public/' });
    }
})
module.exports = router;