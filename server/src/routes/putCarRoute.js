import express from "express";
import Car from "../models/car.js";

const router = express.Router();

router.put("/cars/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedData = req.body;

    const updatedCar = await Car.findByIdAndUpdate(carId, updatedData, { new: true });

    if (!updatedCar) {
      return res.status(404).send({ message: "데이터를 찾을 수 없습니다." });
    }

    res.send(updatedCar);
  } catch (error) {
    if (id === "null" || id === "undefine") {
      res.status(500).json("id값이 존재하지않습니다.");
    } else {
      res.status(500).send({ message: error.message });
    }
  }
});

export default router;
