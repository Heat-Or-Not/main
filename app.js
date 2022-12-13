'use strict';

const express = require("express");
const cors = require("cors");
const path = require("path")
const mysql = require("mysql2");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const carRoute = require("../HON_Project/routes/carRoute");
const { httpError } = require("../HON_Project/utils/errors");
const port = 3000;

//const pool = require('../database/db');

app.use(cors());
app.use(express.static("ui"));
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use("/thumbnails", express.static("thumbnails"));
app.use(cookieParser());
app.set('view engine', 'html');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})
// Define Routes
app.use('/', require('./routes/pagesRoute'));
app.use('/auth', require('./routes/authRoute'));

app.use("/car", carRoute);
// app.use("/user", userRoute);

app.use((req, res, next) => {
    const err = httpError("Not found", 404);
    next(err);
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ message: err.message || "Internal server error" });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
