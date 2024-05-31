import express from "express";
import Car from "../models/car.js";

const router = express.Router();

// Get all cars or filtered cars
router.get("/cars", async (req, res) => {
  const { brand, size, body, fuel } = req.query;

  console.log("brand: ", brand);
  console.log("size: ", size);
  console.log("body: ", body);
  console.log("fuel: ", fuel);

  let query = {};
  if (brand) {
    query["brand"] = { $in: brand.split(",") }; // 참조된 브랜드 ID를 기반으로 필터링
  }
  if (size) {
    query["segment.size"] = { $in: size.split(",") };
  }
  if (body) {
    query["segment.body"] = { $in: body.split(",") };
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
