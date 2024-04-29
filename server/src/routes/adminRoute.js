import express from "express";
import User from "../models/user.js"; // Model

const router = express.Router();

// 서버로 검증 요청
router.post('/verify-password', async (req, res)=> {
  try {
    const { password } = req.body;;
    // 환경변수 비밀번호와 호출받은 비밀번호 비교
    console.log(password)
    console.log("Admin PW from env:", process.env.ADMIN_PW);
    console.log(password === process.env.ADMIN_PW)

    if(password === process.env.ADMIN_PW){
      res.status(200).send({verified: true});
    } else {
      res.status(200).send({verified: false, reason: "Invalid password"});
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

export default router;