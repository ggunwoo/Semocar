export interface Car {
  id: number;
  krName: string;
  enName: string;
  imgUrl: string;
}

export interface Segment {
  seg: string;
  id: number;
  cars: Car[] | null;
}

export interface Brand {
  brand: string;
  enBrand: string;
  id: number;
  segment: Segment[];
}