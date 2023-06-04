import { createSlice } from '@reduxjs/toolkit';

export const selectedFuel = createSlice({
  name: 'selectedFuel',
  initialState: [] as string[],
  reducers: {
    fuelIn: (state, action) => {
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

export const { fuelIn, fuelReset } = selectedFuel.actions