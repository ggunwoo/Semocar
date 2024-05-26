import express from "express";
import Car from "../models/car.js";

const router = express.Router();

// Get all cars or filtered cars
router.get("/cars", async (req, res) => {
  const { brand, segment, fuel } = req.query;

  console.log(`$brand=${brand}&segment=${segment}&fuel=${fuel}`);

  let query = {};
  if (brand) {
    query["brand"] = { $in: brand.split(",") }; // 참조된 브랜드 ID를 기반으로 필터링
  }
  if (segment) {
    query.segment = { $in: segment.split(",") };
  }
  if (fuel) {
    query["fuel_types.id"] = { $in: fuel.split(",") };
  }

  try {
    const cars = await Car.find(query).populate("brand"); // 브랜드 참조 필드 채우기
    res.json(cars);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
