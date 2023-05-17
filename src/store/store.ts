import { configureStore, createSlice } from "@reduxjs/toolkit";
import cars from '../api/carData.json';
import carBrands from '../api/brand.json';

const carData = createSlice({
  name: 'carData',
  initialState: cars,
  reducers: {
    filter(state){
      
      return state
    }
  },
});

const carBrand = createSlice({
  name: 'carBrand',
  initialState: carBrands,
  reducers: {}
})

const store = configureStore({
  reducer: {
    cars: carData.reducer,
    brands: carBrand.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
