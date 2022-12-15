"use strict";
const {
  getCar,
  getAllCars,
  addCar,
  updateCar,
  deleteCar,
} = require("../models/carModel");
const { httpError, catchError} = require("../utils/errors");
const { validationResult } = require("express-validator");
const sharp = require("sharp");

const car_list_get = async (req, res, next) => {
  try {
    const cars = await getAllCars();
    if (cars.length < 1) {
      next(httpError("No cars found", 404));
      return;
    }
    res.json(cars);
  } catch (e) {
    console.error("car_list_get", e.message);
    next(catchError(e));
  }
};

const car_get = async (req, res, next) => {
  try {
    const car = await getCar(req.params.id);
    if (car.length < 1) {
      next(httpError("No car found", 404));
      return;
    }
    res.json(car.pop());
  } catch (e) {
    console.error("car_get", e.message);
    next(catchError(e));
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
      return next(httpError("Invalid data", 400));
    }

    console.log("car_post", req.body, req.file);

    const thumbnail = await sharp(req.file.path)
      .resize(256, 144)
      .png()
      .toFile("./thumbnails/" + req.file.Image);

    const data = [
      req.body.Brand,
      req.body.Model,
      req.body.Description,
      req.body.UserID,
      req.file.filename,
    ];

    const result = await addCar(data);
    if (result.affectedRows < 1) {
      return next(httpError("Invalid data", 400));
    }
    if (thumbnail) {
      res.json({
        message: "car added",
        CarID: result.insertId,
      });
    }
  } catch (e) {
    console.error("car_post", e.message);
    next(catchError(e));
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
      return next(httpError("Invalid data", 400));
    }
    const thumbnail = await sharp(req.file.path)
      .resize(256, 144)
      .png()
      .toFile("./thumbnails/" + req.file.Image);

    const data = [
      req.body.Brand,
      req.body.Model,
      req.body.Description,
      req.file.filename,
      req.body.CarID,
    ];

    const result = await updateCar(data);
    if (result.affectedRows < 1) {
      return next(httpError("Invalid data", 400));
    }
    if (thumbnail) {
      res.json({
        message: "car updated",
        CarID: result.insertId,
      });
    }
  } catch (e) {
    console.error("car_put", e.message);
    next(catchError(e));
  }
};

const car_delete = async (req, res, next) => {
  try {
    const result = await deleteCar(req.params.id);
    if (result.affectedRows < 1) {
      return next(httpError("No car deleted", 400));
    }
    res.json({
      message: "car deleted",
    });
  } catch (e) {
    console.error("delete", e.message);
    next(catchError(e));
  }
};

module.exports = {
  car_list_get,
  car_get,
  car_post,
  car_put,
  car_delete,
};
