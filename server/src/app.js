dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"; // .env 사용하기위한 라이브러리
import mongoose from "mongoose";

// Router Import
import adminRouter from "./routes/adminRoute.js";
import createBrandsRouter from "./routes/createBrandRoute.js";
import createCarRouter from "./routes/createCarRoute.js";
import getBrandListRouter from "./routes/getBrandListRoute.js";
import getBrandRouter from "./routes/getBrandRoute.js"
import getCarListRouter from "./routes/getCarListRoute.js";
import getCarRouter from "./routes/getCarRoute.js";

const app = express();
app.use(cors()); // cors 전체 url 허용
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // EJS를 뷰 엔진으로 설정
app.set("views", "./views"); // EJS 파일이 위치할 디렉토리 지정

// .ejs 문서 생성
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" }); // 서버 메인 페이지
});
app.get("/create", (req, res) => {
  res.render("create", { title: "Create Page" }); // 브랜드 생성 임시 페이지
});

// Use Router
app.use("/api", adminRouter); // Admin password 검증 라우트
app.use("/create", createBrandsRouter); // 브랜드 생성 라우트
app.use("/create", createCarRouter);
app.use("/", getBrandListRouter); // 브랜드 리스트 데이터 가져오기 라우트
app.use("/", getCarListRouter); // 자동차 리스트 가져오기 라우트
app.use("/", getBrandRouter); // 특정 브랜드 데이터 가져오기 라우트
app.use("/", getCarRouter); // 특정 자동차 데이터 가져오기 라우트


// ==================================================
// ================== MongoDB 연결 ==================
// ==================================================
async function main() {
  const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/semocar";

  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected, MongoDB 연결 성공"); // DB연결 성공
    // === 서버 실행 ===
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () =>
      console.log(`
      ##############################################################
      ## 서버에 성공적으로 연결되었습니다. ${PORT} ##
      ##############################################################
      `)
    );
  } catch (err) {
    console.error("MongoDB connection error:", err); // 실패
  }
} 
// ==================================================
    main(); // DB 연결 함수 실행 =====================
// ==================================================


export default app;
