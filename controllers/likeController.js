"use strict";
const { getLike, addLike, getLikesInRow } = require("../models/likeModel");
const { httpError } = require("../utils/errors");
const { validationResult } = require("express-validator");

const like_list_get = async (req, res, next) => {
  try {
    const likes = await getLikesInRow(next);
    if (likes.length < 1) {
      next(httpError("No likes found", 404));
      return;
    }
    res.json(likes);
  } catch (e) {
    console.error("like_list_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const like_get = async (req, res, next) => {
  try {
    const like = await getLike(req.params.id, next); // req params id sijasta user db -> lastviewed
    if (like.length < 1) {
      next(httpError("No likes found", 404));
      return;
    }
    res.json(like /*.pop()*/);
  } catch (e) {
    console.error("like_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const like_post = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error("like_post", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    console.log("like_post", req.body);
    const data = [
      req.body.status, // req.body.status
      req.body.CarID, // car id
      req.body.UserID, // TODO req.user.UserID Logged in user id
      // ALSO REMOVE FORMDATA.append
    ];

    const result = await addLike(data, next);
    if (result.affectedRows < 1) {
      next(httpError("Invalid data", 400));
      return;
    }
    res.json({
      message: "Liked",
      CarID: result.insertId,
    });
  } catch (e) {
    console.error("like_post", e.message);
    next(httpError("Internal server error", 500));
  }
};

module.exports = {
  like_list_get,
  like_get,
  like_post,
};
