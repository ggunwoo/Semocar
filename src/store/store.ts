import { configureStore } from "@reduxjs/toolkit";
import { segment, } from './segment'
import { fuelType } from './fuelType'

export const store = configureStore ({
  reducer : {
  }
});
store.dispatch(fetchCarData());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;