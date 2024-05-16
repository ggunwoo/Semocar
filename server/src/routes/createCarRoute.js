import express from "express";
import Car from "../models/car.js";

const router = express.Router();

// --시퀀스 번호를 추가한 최종 ID 생성 함수
async function generateSequenceId(baseId) {
  let sequence = 1;
  let finalId = "";

  // --DB에 중복된 ID가 없을 때까지 시퀀스 번호를 증가
  do {
    finalId = `${baseId}${sequence}`;
    const existingCar = await Car.findOne({ id: finalId });
    if (!existingCar) break;
    sequence += 1;
  } while (sequence <= 9);

  if (sequence > 9) throw new Error("ID 시퀀스 번호가 9를 초과했습니다.");

  return finalId;
}

router.post("/car", async (req, res) => {
  try {
    const { id: baseId, ...otherCarData } = req.body;
    const finalId = await generateSequenceId(baseId);
    const newCar = new Car({ id: finalId, ...otherCarData });
    await newCar.save();
    res.status(201).send("전송완료");
  } catch (error) {
    res.status(400).json({ message: "전송실패", error: error.message });
  }
});

export default router;
