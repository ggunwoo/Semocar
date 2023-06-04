import { configureStore } from "@reduxjs/toolkit";
import { selectedSeg } from './segment'
import { selectedFuel } from './fuelType'

export const store = configureStore ({
  reducer : {
    selectedSeg: selectedSeg.reducer,
    selectedFuel: selectedFuel.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;