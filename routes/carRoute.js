"use strict";
const express = require("express");
const multer = require("multer");
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(httpError("Invalid file", 400));
  }
};

const upload = multer({ dest: "uploads/", fileFilter });
const {
  car_list_get,
  car_get,
  car_post,
  car_put,
  car_delete,
} = require("../../HON_Project/controllers/carController");
const { body } = require("express-validator");
const router = express.Router();

router
  .route("/")
  .get(car_list_get)
  .post(
    upload.single("car"),
    body("Brand").isLength({ min: 1 }).escape(),
    body("Model").isLength({ min: 1 }).escape(),
    body("Description").isLength({ min: 1 }).escape(),
    body("UserID").isNumeric(),
    car_post
  )
  .put(
    body("Brand").isLength({ min: 1 }).escape(),
    body("Model").isLength({ min: 1 }).escape(),
    body("Description").isLength({ min: 1 }).escape(),
    body("UserID").isNumeric(),
    body("id").isNumeric(),
    car_put
  );

router.route("/:id").get(car_get).delete(car_delete);

module.exports = router;
