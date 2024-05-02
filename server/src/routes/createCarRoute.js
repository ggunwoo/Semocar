import express from "express";
import Car from "../models/car.js";


const router = express.Router();

router.post("/cars", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();

    res.status(201).send("전송완료");
  } catch (error) {
    res.send("전송실패");
    res.status(400).send( "전송실패: " + error.message );
    // TODO : DB에 같은 ID값이 존재할 시 state(400) 요청 및 같은 ID값이 존재하다는 메세지 반환
  }
});

export default router;
