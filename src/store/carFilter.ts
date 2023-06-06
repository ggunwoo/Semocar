import { createSlice } from "@reduxjs/toolkit";

export const selectedSeg = createSlice({
  name: 'selectedSeg',
  initialState: [] as string[],
  reducers: {
    segIn: (state, action)=>{
      const segment = action.payload
      if(state.includes(segment)){
        const updatedSegment = state.filter((item:string) => item !== segment);
        return updatedSegment
      } else {
        let copySegment = [...state, segment]
        return copySegment
      }
    },
    segReset: (state)=>{
      if(state.length !== 0){
        return []
      }
    },
  },
})

export const selectedFuel = createSlice({
  name: 'selectedFuel',
  initialState: [] as string[],
  reducers: {
    fuelIn: (state, action)=>{
      const fuelType = action.payload
      if (state.includes(fuelType)) {
        const updatedFuelType = state.filter((item:string) => item !== fuelType);
        return updatedFuelType
      } else {
        const copyFuelType = [...state, fuelType];
        return copyFuelType
      }
    },
    fuelReset: (state)=>{
      if(state.length !== 0){
        return []
      }
    }
  },
})

export const selectedBrand = createSlice({
  name: 'selectedBrand',
  initialState: [] as string[],
  reducers: {
    // brandIn: (state, action)=>{
    //   state = action.payload;
    // },
    brandIn: (state, action)=>{
      const brand = action.payload;
      if(state.includes(brand)){
        // 값은 값 체크 해제
        const updatedBrand = state.filter((item:string) => item !== brand)
        return updatedBrand;
      } else {
        const copyBrand = [brand];
        return copyBrand;
      }
    },
    brandReset: (state)=>{
      if(state.length !== 0){
        return []
      }
    }
  },
})

export const { segIn, segReset } = selectedSeg.actions;
export const { fuelIn, fuelReset } = selectedFuel.actions
export const { brandIn, brandReset } = selectedBrand.actions;