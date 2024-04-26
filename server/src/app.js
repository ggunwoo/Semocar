dotenv.config();

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
// Router Import
import brandsRouter from "./routes/brandRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // EJS를 뷰 엔진으로 설정
app.set("views", "./views"); // EJS 파일이 위치할 디렉토리 지정

// .ejs 문서 생성
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});
app.get("/create", (req, res) => {
  res.render("create", { title: "Create Page" });
});

// Use Router
app.use("/create", brandsRouter); // 브랜드 생성 라우트
app.use("/api", adminRouter); // 어드민 비밀번호 검증 라우트

// MongoDB 연결
async function main() {
  const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/semocar";

  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected"); // DB연결 성공
    // 서버 실행
    const port = process.env.PORT;
    app.listen(port, () =>
      console.log(`
      ########################################################
      Server running on http://localhost:${port}/
      ########################################################
      `)
    );
  } catch (err) {
    console.error("MongoDB connection error:", err); // 실패
  }
}
main(); // DB 연결 함수 실행

export default app;
