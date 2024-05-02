import axios from "axios";

// 개발 => 로컬서버 URL, 배포(환경설정) => aws 클라우드 서버)
export const serverUrl = process.env.SERVER_URL

export const getCarData = async () => {
  try {
    const response = await axios.get(
      "https://gist.githubusercontent.com/ggunwoo/3bec1be58457d14aab3e04fea8434458/raw/4076fd0af826abcdecc5a931d43f886a2c78f704/CarData.json"
    );
    return response.data;
  } catch (error) {
    console.log("error car data", error);
    return null;
  }
};

export const getBrands = async () => {
  try {
    const response = await axios.get(`${serverUrl}/brands`)
    return response.data;
  } catch (error) {
    console.log("error get brand", error);
    return null;
  }
};

// 차급
// TODO : 추후에 차급 - 사이즈, 플랫폼으로 나누기 (사이즈: 소형,중형,대형 | 플랫폼: 세단, SUV, 왜건)
export const segments = [
  "경차",
  "소형세단",
  "준중형세단",
  "중형세단",
  "준대형세단",
  "대형세단",
  "소형SUV",
  "준중형SUV",
  "중형SUV",
  "준대형SUV",
  "대형SUV",
  "RV",
  "MPV",
  "픽업",
  "벤",
  "쿠페",
  "해치백",
  "왜건",
];