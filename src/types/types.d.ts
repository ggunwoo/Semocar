
export interface Brand {
  kr : string
  en : string
}

export interface Name {
  kr : string
  en : string
}
export interface price {
  min : number
  max : number
}

export interface Cars {
  brand: Brand
  name : Name
  id : number
  segment : string
  imgUrl : string
  price : price
}

// AllCarsPage
interface AllCarsPageProps {
  drawerWidth : string;
}