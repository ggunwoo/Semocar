import express from "express";
import Car from "../models/car.js";

const router = express.Router();

router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router
