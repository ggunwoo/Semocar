import express from "express";
import Car from "../models/car.js";

const router = express.Router();

router.get("/cars/:id/image", async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findOne({id: carId});
    if (!car) {
      return res.status(400).send({ message: "자동차 이미지 존재하지않음" });
    }
    res.json(car.image_path);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
