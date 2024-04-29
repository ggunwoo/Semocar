import mongoose, { Schema } from "mongoose";

// 트림(Trims) 스키마
const trimSchema = new Schema({
  //■■■■■전 차종 Trim 기본 필드■■■■■
  name: String, // 이름
  price: Number, // 가격
  fuel_Type: { name: String, id: Number }, // 연료 ▶ 가솔린(1), 디젤(1), 하이브리드(2), 전기,수소(3)
  engine: { type: String, required: false }, // 엔진 종류 ▶ 직렬, v6 등
  displacement: String, // 배기량 ▶ ----cc
  trans_mission: String, // 변속기 ▶ 수동, 8단자동, 7단DCT, CVT 등
  driving_system: String, // 구동타입 ▶ FF, FR, RR, 4WD 등
  power: { type: Number, required: false }, // 출력 ▶ ---마력
  torque: { type: Number, required: false }, // 토크 ▶ --.-kg.m
  gas_mileage: String, // 복합연비 ▶ --.-km/l
  urban_gas_mileage: { type: Number, required: false }, // 도심연비 ▶ --.-km/l
  highway_gas_mileage: { type: Number, required: false }, // 고속연비 ▶ --.-km/l
  lowEmission: { type: Number, required: false }, // 에너지 소비 효율 ▶ -등급
  vehicleWeight: Number, // 공차중량 ▶ ----kg
  frontTire: String, // 앞 타이어 규격 ▶ --- --R --
  rearTire: String, // 뒷 타이어 규격 ▶ --- --R --
  frontBrake: String, // 전륜 브레이크
  rearBrake: String, // 후륜 브레이크
  frontSuspension: String, // 전륜 서스펜션
  rearSuspension: String, // 후륜 서스펜션
  capacity: Number, // 승차정원 ▶ -인승
  length: Number, // 전장(길이) ▶ ----mm
  weight: Number, // 전폭(넓이) ▶ ----mm
  height: Number, // 전고(높이) ▶ ----mm
  wheelBase: Number, // 축거(휠베이스) ▶ ----mm
  track: Number, // 윤거전 ▶ ----mm
  tread: Number, // 윤거후 ▶ ----mm

  //■■■■■하이브리드, 전기(수소) Trim 추가 필드■■■■■
  motor_power: { type: Number, required: false }, // 모터출력 ▶ ---kw
  motor_torque: { type: Number, required: false }, // 모터토크 ▶ --.-kg.m
  battery_type: { type: Number, required: false }, // 배터리 종류 ▶ 리튬이온, 리튬 인산철 등
  battery_volume: { type: Number, required: false }, // 배터리 용량 ▶ kWh
  battery_voltage: { type: Number, required: false },

  //■■■■■플러그인 하이브리드, 전기(수소) Trim 고유 필드■■■■■
  ev_mileage: { type: Number, required: false }, // 복합전비 ▶ ---km/kWh
  urban_ev_mileage: { type: Number, required: false }, // 도심전비 ▶ ---km/kWh
  highway_ev_mileage: { type: Number, required: false }, // 고속전비 ▶ ---km/kWh
  range: { type: Number, required: false }, // 복합 주행거리 ▶ ---km/kWh
  urban_range: { type: Number, required: false }, // 도심 주행거리 ▶ ---km/kWh
  highway_range: { type: Number, required: false }, // 고속 주행거리 ▶ ---km/kWh
});

// 모델(Grades) 스키마
const gradeSchema = new Schema({
  //■■■■■ Grades 필드■■■■■
  name: String, // Grades명 ▶ 프리미엄, 익스클루시브 등
  id: Number, // Grades ID(고유값) ▶ 0 ~ 99
  trims: [trimSchema], // Trim스키마 참조
});

// 기본 제원 스키마
const baseCarSchema = new mongoose.Schema({
  //■■■■■ 기본 제원 필드■■■■■
  brand: { type: Schema.Types.ObjectId, ref: "Brand" }, // 브랜드 콜렉션 참조
  name: String, // 차량 모델명 ▶ 쏘나타, 콜로라도, GV90 등
  english_name: String, // 차량 모델명(영어) ▶ Sonata, Colorado, GV90
  id: Number, // 차량 고유번호(ID) ▶ 브랜드, 차급, 작성순서순으로 조합 (기아(11) 경차(11) 레이(1)) = 11111
  segment: String, // 차급명칭(한국기준) ▶ 경차, 준중형, 중형, 준대형SUV 등
  photoNumber: {
    exterior: Number, // 차량 외관 사진 개수 ▶ 0~99
    interior: Number, // 차량 내장 사진 개수 ▶ 0~99
  },
  price: {
    min: Number, // 차량 낮은등급 가격 ▶ ----~원
    max: Number, // 차량 높은등급 가격 ▶ ----~원
  },
  date: String, // 차량 출시일 ▶ "----.--" = 연도.월
  gasMileage: String, // 연비 ▶ "--.-~--.-" km/l
  fuelTypes: [String], // 모델 연료 정보 ▶ [가솔린, 디젤, LPG, 하이브리드], [전기(배터리)], [전기(수소)]
  grades: [gradeSchema], // Grade스키마 참조
});



const Car = mongoose.model("Car", baseCarSchema);

export default Car;
