const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();
const pool = require('../database/db');

router.get('/', (req, res) => {
    res.sendFile("login.html", { root: './ui/' })
});
router.get('/register', (req, res) => {
    res.sendFile("register.html", { root: './ui/' })
});
router.get('/login', (req, res) => {
    res.sendFile("login.html", { root: './ui/' })
});
router.get('/front', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.sendFile("frontpage.html", { root: './ui/' })
    } else {
        res.sendFile("login.html", { root: './ui/' });
    }
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.sendFile("profile.html", { root: './ui/' })
    } else {
        res.sendFile("login.html", { root: './ui/' });
    }
});

router.get('/myprofile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.sendFile("myprofile.html", { root: './ui/' })
    } else {
        res.sendFile("login.html", { root: './ui/' });
    }
});

router.get('/ranking', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.sendFile("ranking.html", { root: './ui/' })
    } else {
        res.sendFile("login.html", { root: './ui/' });
    }
});

module.exports = router;
