'use strict';

const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");

//Returns info of the user logged in
exports.getUserInfo = async (req, res, next) => {
    if (req.cookies.token) {
        try {
            // 1. Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.token,
                process.env.JWT_SECRET
            );
            console.log(decoded);

            // 2. Check if the user still exist
            pool.query('SELECT * FROM hon_user WHERE UserID = ?', [decoded.id], (err, results) => {
                console.log(results);
                res.json(results);
            });
        } catch (err) {
            console.log(err)
        }
    }
}
//

//returns of every user
exports.getUsers = async (req, res, next) => {
    const fetchid = req.params.id;
    pool.query('select * from hon_user WHERE userID = ?', fetchid,(err,results)=>{
        if(err) {
            console.log(err);
        }else {
            let value = JSON.parse(JSON.stringify(results));
            res.json(results);
            console.log(value);
        }
    })
}