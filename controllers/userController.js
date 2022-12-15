"use strict";

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const promisePool = pool.promise();

//Returns info of the user logged in
exports.getUserInfo = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      // 1. Verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      console.log(decoded);

      // 2. Check if the user still exist
      pool.query(
        "SELECT hon_user.UserID, hon_user.email, hon_user.Username, hon_user.LastViewed from hon_user WHERE hon_user.UserID = ?",
        [decoded.id],
        (err, results) => {
          console.log(results);
          res.json(results);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};
//

//returns of every user
exports.getUsers = async (req, res, next) => {
  const fetchid = req.params.id;
  pool.query(
    "SELECT hon_user.UserID, hon_user.email, hon_user.Username, hon_user.LastViewed, hon_car.CarID, hon_car.Brand, hon_car.Model, hon_car.Description, hon_car.Image from hon_user INNER JOIN hon_car ON hon_car.UserID = hon_user.UserID WHERE hon_user.UserID = ?",
    fetchid,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        let value = JSON.parse(JSON.stringify(results));
        res.json(results);
        console.log(value);
      }
    }
  );
};
// exports.getLW = async (req, res, next) => {
//   const data = [req.params.id, req.params.lw];
//   console.log("LastViewed: " + lw + " UserID: " + id);
//   pool.query(
//     "UPDATE hon_user SET LastViewed= ? WHERE UserID = ?;",
//     data,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//       } else {
//         let value = JSON.parse(JSON.stringify(results));
//         res.json(results);
//         console.log(value);
//       }
//     }
//   );
// };
