export interface TrimType {
  id: number;
  name: string;
  price: number;
  field?: string;
  engine?: string;
  fuel_type: string;
  displacement?: string;
  trans_mission: {
    type: string,
    gear: string,
  };
  driving_system: string;
  power?: number;
  torque?: number;
  gas_mileage?: string;
  urban_gas_mileage?: number;
  highway_gas_mileage?: number;
  low_emission: string;
  vehicle_weight: number;
  front_tire: string;
  rear_tire: string;
  front_brake: string;
  rear_brake: string;
  front_suspension: string;
  rear_suspension: string;
  capacity: number;
  length: number;
  weight: number;
  height: number;
  wheel_base: number;
  track: number;
  tread: number;
  motor_power?: number;
  motor_torque?: number;
  battery_type?: number;
  battery_volume?: number;
  battery_voltage?: number;
  ev_mileage?: number;
  urban_ev_mileage?: number;
  highway_ev_mileage?: number;
  range?: number;
  urban_range?: number;
  highway_range?: number;
}

export interface GradeType {
  name: string;
  id: number;
  trims: trim[];
}

// ■■ 자동차 제원 데이터 서버 전송 타입 ■■
export interface CarDataType {
  brand: string;
  name: string;
  english_name: string;
  id: number;
  segment: string;
  photo_count: { exterior: number; interior: number };
  price: { min: number; max: number };
  date: { year: number; month: number };
  gas_mileage: { min: number; max: number };
  fuel_types: { name: string; id: number }[];
  grades: grade[];
}






// ==========Old========

// brand.json (Old)
export interface Brands {
  name: { kr: string; en: string };
  id: number;
  imgUrl: string;
}

// Brand.tsx (Old)
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// carData.json (Old)
interface Car {
  brand: {
    kr: string;
    en: string;
  };
  name: {
    kr: string;
    en: string;
  };
  id: number;
  segment: string;
  imgUrl: string;
  photoNumber: { exterior: number; interior: number };
  price: {
    min: number;
    max: number;
  };
  date: string;
  gasMileage: string;
  fuelTypes: string[];
  grades: Grade[];
}

interface Grade {
  name: string;
  trims: Trim[];
}

interface Trim {
  name: string;
  price: number;
  fuelType: string;
  engine: string;
  displacement: string;
  transMission: string;
  drivingSystem: string;
  power: string;
  torque: string;
  complexGasMileage: string;
  urbanGasMileage: string;
  highwayGasMileage: string;
  ratingGasMileage: string;
  lowEmission: string;
  vehicleWeight: string;
  autoLevel: string;
  frontTire: string;
  rearTire: string;
  frontBrake: string;
  rearBrake: string;
  frontSuspension: string;
  rearSuspension: string;
  capacity: string;
  length: string;
  weight: string;
  height: string;
  wheelBase: string;
  track: string;
  tread: string;
  zero: string | number;

  // 전기
  evMileage: string;
  charging: string;
  chargingQuick: string;
  chargingSlow: string;

  // + 하이브리드
  batteryType: string;
  batteryVolume: string;
  motorPower: string;
  motorTorque: string;
}
