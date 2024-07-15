import mongoose from "mongoose";

// 트림(Trims) 스키마
const trimSchema = new mongoose.Schema({
  // ■■■■■전 차종 Trim 기본 필드■■■■■
  name: String, // 이름
  id: String, // 고유값 id할당 ▶ 오름차순 정렬을 위한
  field: String, // 트림 연료 유형 ▶ ICE(내연기관), HEV, PHEV(하이브리드), EV(전기)
  price: Number, // ----가격 (만원)
  fuel_type: String, // 연료 ▶ 가솔린, 디젤, 하이브리드, 전기, 수소
  low_emission: String, // 에너지 소비 효율 ▶ -등급
  driving_system: String, // 구동타입 ▶ FF, FR, RR, 4WD AWD 등
  vehicle_weight: Number, // 공차중량 ▶ ----kg
  front_brake: String, // 전륜 브레이크
  rear_brake: String, // 후륜 브레이크
  front_suspension: String, // 전륜 서스펜션
  rear_suspension: String, // 후륜 서스펜션
  capacity: Number, // 승차정원 ▶ -인승
  length: Number, // 전장(길이) ▶ ----mm
  width: Number, // 전폭(넓이) ▶ ----mm
  height: Number, // 전고(높이) ▶ ----mm
  wheel_base: Number, // 축거(휠베이스) ▶ ----mm
  track: Number, // 윤거전 ▶ ----mm
  tread: Number, // 윤거후 ▶ ----mm
  front_tire: {
    width: {type: String, default: "000"}, // 앞 타이어 폭 ▶ --- 
    flatness: {type: String, default: "00R"}, // 앞 타이어 편평비 ▶ --R
    inch: {type: String, default: "00"}, // 앞 타이어 휠 사이즈 ▶ -- (inch)
  },
  rear_tire: {
    width: {type: String, default: "000"}, // 뒷 타이어 폭 ▶ --- 
    flatness: {type: String, default: "00R"}, // 뒷 타이어 편평비 ▶ --R
    inch: {type: String, default: "00"}, // 뒷 타이어 휠 사이즈 ▶ -- (inch)
  },
  trans_mission: {
    gear: {type: String, default: "0단"}, // 변속기단수 ▶ 1단~8단 (일단 8단까지만)
    type: {type: String, default: "변속기"}, // 변속기종류 ▶ 수동, 토크컨버터, DCT, CVT, AMT, IVT 등
  },
  
  // ■■■■■내연기관(ICE), 하이브리드(HEV, PHEV) 추가 필드■■■■■
  engine: String, // 엔진 종류 ▶ 직렬, v6 등
  power: Number, // 출력 ▶ ---마력
  torque: Number, // 토크 ▶ --.-kg.m
  displacement: Number, // 배기량 ▶ ----cc
  gas_mileage: Number, // 복합연비 ▶ --.-km/l
  urban_gas_mileage: Number, // 도심연비 ▶ --.-km/l
  highway_gas_mileage: Number, // 고속연비 ▶ --.-km/l

  // ■■■■■하이브리드(HEV, PHEV), 전기(EV(배터리, 수소)) 추가 필드■■■■■
  motor_power: Number, // 모터출력 ▶ ---kw
  motor_torque: Number, // 모터토크 ▶ --.-kg.m
  
  // ■■■■■플러그인 하이브리드(PHEV), 전기(EV(배터리, 수소)) 고유 필드■■■■■
  battery_type: String, // 배터리 종류 ▶ 리튬이온, 리튬 인산철 등
  battery_volume: Number, // 배터리 용량 ▶ --.- kWh
  ev_mileage: Number, // 복합전비 ▶ ---km/kWh
  urban_ev_mileage: Number, // 도심전비 ▶ ---km/kcdWh
  highway_ev_mileage: Number, // 고속전비 ▶ ---km/kWh
  
  // ■■■■■전기(EV(배터리, 수소)) Trim 고유 필드■■■■■
  battery_voltage: Number, // 배터리 전압 ▶ -- V
  range: Number, // 복합 주행거리 ▶ ---km/kWh
  urban_range: Number, // 도심 주행거리 ▶ ---km/kWh
  highway_range: Number, // 고속 주행거리 ▶ ---km/kWh
}, { versionKey: false });

// 모델(Grades) 스키마
const gradeSchema = new mongoose.Schema({
  // ■■■■■ Grades 필드■■■■■
  name: String, // Grades명 ▶ 프리미엄, 익스클루시브 등
  id: String, // Grades ID(고유값) ▶ 0 ~ 99
  trims: [trimSchema], // Trim스키마 참조
}, { versionKey: false });

// 기본 제원 스키마
const baseCarSchema = new mongoose.Schema({
  // ■■■■■ 기본 제원 필드■■■■■
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" }, // ref: 브랜드 콜렉션 참조
  model: {
    name: {type: String, required: true}, // 차량 모델명(한글) ▶ 아반떼(아반뗴, 더 뉴 아반떼)
    english_name: {type: String, required: true}, // 차량 모델명 (항상 소문자) ▶ avante(Avante, The new Avante)
  }, 
  model_initial: String || null,
  name: String, // 차량명 ▶ 쏘나타 디 엣지, 콜로라도, GV90 등
  english_name: String, // 차량 모델명(영어) ▶ Sonata, Colorado, GV90
  is_facelift: Boolean,
  image_path: String,
  id: String, // 차량 고유번호(ID) ▶ 브랜드, 차급, 작성순서순으로 조합 (기아(11) 경차(11) 레이(1)) = 11111
  segment: { // (한국기준)
    size: String, // 차급-크기 ▶ 경형 소형 준중형 중형 준대형 대형
    body: String, // 차급-스타일 ▶ , SUV, CUV, 쿠페, 왜건, 해치백, RV, MPV, 픽업트럭, 밴 등
  }, 
  date: {
    year: Number,
    month: Number,
  }, // 차량 출시일 ▶ "----.--" = 연도.월
  fuel_types: [{
    name: String,
    id: String
  }], // 모델 연료 정보 ▶ [가솔린, 디젤, LPG, 하이브리드], [전기(배터리)], [전기(수소)]
  grades: [gradeSchema], // Grade스키마 참조
}, { versionKey: false });

const Car = mongoose.model("Car", baseCarSchema);

export default Car;
