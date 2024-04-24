import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Router Import
import brandsRouter from "./routes/brand";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // EJS를 뷰 엔진으로 설정
app.set("views", "./views"); // EJS 파일이 위치할 디렉토리 지정

// Use Router
app.use(brandsRouter);

// MongoDB 연결
async function main() {
  const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/semocar";

  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected"); // 서버 연결 성공
    console.log(dbURI)

  } catch (err) {
    console.error("MongoDB connection error:", err); // 실패
  }
}
main(); // DB 연결 함수 실행

// 문서 생성 .ejs
app.get("/create", (req, res) => {
  res.render("create", { title: "Home Page" });
});

// 서버 실행
const port = process.env.PORT;
app.listen(port, () =>
  console.log(`
########################################################
Server running on http://localhost:${port}/
########################################################
`)
);

export default app;
