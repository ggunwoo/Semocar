// brand.json
export interface Brands {
  name : { kr : string, en: string}
  id : number
  imgUrl : string
}

// Brand.tsx
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// carData.json
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
  price: {
    min: number;
    max: number;
  };
  gasMileage: string,
  fuelTypes: string[],
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
  transmission: string;
  drivingSystem: string;
  power: string;
  torque: string;
  gasMileage: string;
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
}