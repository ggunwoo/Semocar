import express from "express";
import Car from "../models/car.js";

const router = express.Router();

router.get("/cars/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findOne({id: carId}).populate('brand'); // 직접 작성한 id필드 값으로 검색
    if (!car) {
      return res.status(400).send({ message: "자동차 데이터가 없다" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
