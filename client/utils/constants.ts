export const MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const serverUrl = process.env.SERVER_URL; // SERVER URL: 개발=> 로컬서버 URL, 배포(환경설정)=> aws클라우드 서버)
export const imageUrl = process.env.IMAGES_URL; // IMAGE URL

// 차급
// --TODO : 추후에 차급 - 사이즈, 플랫폼으로 나누기 (사이즈: 소형,중형,대형 | 플랫폼: 세단, SUV, 왜건)
export const SEGMENT_SIZE_LIST = ["경형", "소형", "준중형", "중형", "준대형", "대형"];
export const SEGMENT_BODY_LIST = [
  "세단",
  "SUV",
  "벤",
  "픽업",
  "MPV",
  "RV",
  "스포츠카",
  "쿠페",
  "해치백",
  "왜건",
  "트럭",
  "버스",
  "승합",
];
export const SEGMENT_SIZE_IDS = {
  경형: "1",
  소형: "2",
  준중형: "3",
  중형: "4",
  준대형: "5",
  대형: "6",
};
export const SEGMENT_BODY_IDS = {
  세단: "10",
  해치백: "11",
  왜건: "12",
  쿠페: "13",
  스포츠카: "14",
  SUV: "20",
  픽업: "30",
  벤: "31",
  RV: "33",
  MPV: "32",
  트럭: "40",
  버스: "41",
  승합: "42",
};

export const BRAND_IDS = {
  현대: "10",
  기아: "11",
  제네시스: "12",
  르노코리아: "13",
  KGM: "14",
  쉐보레: "15",
};

export const FUELTYPE_LIST = [
  { name: "가솔린", id: "1" },
  { name: "디젤", id: "2" },
  { name: "LPG", id: "3" },
  { name: "하이브리드", id: "4" },
  { name: "전기", id: "5" },
  { name: "수소", id: "6" },
  { name: "바이퓨얼", id: "7" },
];
