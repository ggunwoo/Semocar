import express from "express";
import Car from "../models/car.js";


const router = express.Router();

router.post("/cars", async (req, res) => {
  try {
    const cars = new Car(req.body);
    await cars.save();

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('전송완료')</script>");
  } catch (error) {
    res.write(`<script>alert('전송실패' ${error})</script>`);
    res.status(500).send({ message: error.message });
  }
});

export default router;
