"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getLikesInRow = async (next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT CarID, COUNT(Status)
      FROM hon_likes
      GROUP BY  CarID
      ORDER BY COUNT(Status) DESC;`
    );
    return rows;
  } catch (e) {
    console.error("getLikesInRow", e.message);
    next(httpError("Database error", 500));
  }
};

const getLike = async (carID, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT COUNT(hon_likes.Status)
      FROM ((hon_likes
      INNER JOIN hon_car ON hon_likes.CarID = hon_car.CarID)
      INNER JOIN hon_user ON hon_likes.UserID = hon_user.UserID)
      WHERE hon_likes.CarID = ? AND STATUS = true;`,
      [carID]
    );
    return rows;
  } catch (e) {
    console.error("getLike", e.message);
    next(httpError("Database error", 500));
  }
};

const addLike = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO hon_likes (Status, hon_likes.CarID, hon_likes.UserID) VALUES (?, ?, ?);`,
      data
    );
    return rows;
  } catch (e) {
    console.error("addLikes", e.message);
    next(httpError("Database error", 500));
  }
};

module.exports = {
  getLikesInRow,
  getLike,
  addLike,
};
