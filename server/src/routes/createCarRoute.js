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
    console.log("Constructed newCar object:", newCar.grades[0]);
    await newCar.save();

    res.status(201).send("전송완료");
    res.status(201).json({ message: "전송완료", car: newCar });
  } catch (error) {
    res.status(400).json({ message: "전송실패", error: error.message });
    // TODO : DB에 같은 ID값이 존재할 시 state(400) 요청 및 같은 ID값이 존재하다는 메세지 반환
  }
});

export default router;
