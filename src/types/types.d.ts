export interface Car {
  id: number;
  name : { kr:string , en:string}
  imgUrl: string;
}

export interface Segments {
  name: string;
  id: number;
  cars: Car[];
}

export interface Brand {
  brand: string;
  enName: string;
  id: number;
  segments: Segments[];
}

export interface DetailProps {
  carsData?: type.Brand[];
}