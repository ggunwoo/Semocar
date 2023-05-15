import { configureStore, createSlice } from "@reduxjs/toolkit";
import cars from '../api/carData.json';

const carData = createSlice({
  name: 'carData',
  initialState: cars,
  reducers: {
    filter(state){
      
      return state
    }
  },
});

const store = configureStore({
  reducer: {
    cars: carData.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
