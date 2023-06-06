import { configureStore } from "@reduxjs/toolkit";
import { selectedSeg, selectedFuel, selectedBrand } from './carFilter'
import { brand, toggle } from './brandNav'

export const store = configureStore ({
  reducer: {
    selectedSeg: selectedSeg.reducer,
    selectedFuel: selectedFuel.reducer,
    selectedBrand: selectedBrand.reducer,
    brand: brand.reducer,
    toggle : toggle.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;