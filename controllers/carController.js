"use strict";
const {
  getCar,
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
} = require("../models/carModel");
const { httpError } = require("../utils/errors");
const { validationResult } = require("express-validator");
const sharp = require("sharp");

const car_list_get = async (req, res, next) => {
  try {
    const cars = await getAllCars(next);
    if (cars.length < 1) {
      next(httpError("No cars found", 404));
      return;
    }
    res.json(cars);
  } catch (e) {
    console.error("car_list_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const car_get = async (req, res, next) => {
  try {
    const car = await getCar(req.params.id, next);
    if (car.length < 1) {
      next(httpError("No car found", 404));
      return;
    }
    res.json(car.pop());
  } catch (e) {
    console.error("car_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const car_post = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error("car_post", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    console.log("car_post", req.body, req.file);

    const thumbnail = await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile("./thumbnails/" + req.file.Image);

    const data = [
      req.body.Brand,
      req.body.Model,
      req.body.Description,
      req.body.UserID,
      req.file.filename,
    ];

    const result = await addCar(data, next);
    if (result.affectedRows < 1) {
      next(httpError("Invalid data", 400));
      return;
    }
    if (thumbnail) {
      res.json({
        message: "car added",
        CarID: result.insertId,
      });
    }
  } catch (e) {
    console.error("car_post", e.message);
    next(httpError("Internal server error", 500));
  }
};

const car_put = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error("user_post validation", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    const data = [
      req.body.Brand,
      req.body.Model,
      req.body.Description,
      req.body.UserID,
      req.body.id,
    ];

    const result = await updateCar(data, next);
    if (result.affectedRows < 1) {
      next(httpError("No car modified", 400));
      return;
    }

    res.json({
      message: "car modified",
    });
  } catch (e) {
    console.error("car_put", e.message);
    next(httpError("Internal server error", 500));
  }
};

const car_delete = async (req, res, next) => {
  try {
    const result = await deleteCar(req.params.id, next);
    if (result.affectedRows < 1) {
      next(httpError("No car deleted", 400));
      return;
    }
    res.json({
      message: "car deleted",
    });
  } catch (e) {
    console.error("delete", e.message);
    next(httpError("Internal server error", 500));
  }
};

module.exports = {
  car_list_get,
  car_get,
  car_post,
  car_put,
  car_delete,
};
