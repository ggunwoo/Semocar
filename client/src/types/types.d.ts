// ■■ 자동차 데이터 ■■
export interface TrimType {
  id: string;
  name: string;
  price: number;
  field: string;
  engine?: string;
  fuel_type: string;
  displacement?: number;
  trans_mission?: {
    type?: string;
    gear?: string;
  };
  driving_system?: string;
  power?: number;
  torque?: number;
  gas_mileage?: number;
  urban_gas_mileage?: number;
  highway_gas_mileage?: number;
  low_emission?: string;
  vehicle_weight?: number;
  front_tire?: {
    width?: string;
    flatness?: string;
    inch?: string;
  };
  rear_tire?: {
    width?: string;
    flatness?: string;
    inch?: string;
  };
  front_brake?: string;
  rear_brake?: string;
  front_suspension?: string;
  rear_suspension?: string;
  capacity?: number;
  length?: number;
  width?: number;
  height?: number;
  wheel_base?: number;
  track?: number;
  tread?: number;
  motor_power?: number;
  motor_torque?: number;
  battery_type?: string;
  battery_volume?: number;
  battery_voltage?: number;
  ev_mileage?: number;
  urban_ev_mileage?: number;
  highway_ev_mileage?: number;
  range?: number;
  urban_range?: number;
  highway_range?: number;
}

export interface BaseGradeType {
  name: string;
  id: string;
}
export interface GradeType extends BaseGradeType {
  trims: TrimType[];
}
export interface BrandType {
  _id: string;
  name: string;
  english_name: string;
  logo_path: string;
  id: string;
}

export interface FuelType {
  name: string;
  id: string;
  _id: string;
}

interface BaseCarType {
  model: {
    name: string;
    english_name: string;
  };
  name: string;
  english_name: string;
  model_initial: string | null;
  is_facelift: boolean;
  image_path: string;
  id: string;
  segment: {
    size: string;
    body: string;
  };
  date: { year: number; month: number };
  fuel_types: FuelType[];
}

export interface CarType extends BaseCarType {
  brand: BrandType;
  grades: GradeType[];
}
export interface PostCarType extends BaseCarType {
  brand: string;
  grades: GradeType[];
}

export interface ModelListType {
  model: string;
  name: string;
  segment: string;
  fuel_types: string[];
  generations: CarType[];
}

export interface SimpleTrimType {
  id: string;
  name: string;
  price: number;
  field?: string;
}
export interface PostSimpleCarType extends BaseCarType {
  brand: string;
  grades: SimpleGradeType[];
}
export interface SimpleGradeType extends BaseGradeType {
  trims: SimpleTrimType[];
}
