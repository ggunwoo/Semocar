import { configureStore } from "@reduxjs/toolkit";
import { selectedSeg, selectedFuel, selectedBrand } from "./slice/carFilter";
import { brandListSlice, toggleSlice } from "./slice/useBrandListSlice";
import { carsListSlice, getCarSlice } from "./slice/useCarSlice";
import { segAll, segCheck, fuelAll, fuelCheck } from "./slice/carCheck-slice";
import { formDataSlice } from "./slice/createCarSlice";

export const store = configureStore({
  reducer: {
    selectedSeg: selectedSeg.reducer,
    selectedFuel: selectedFuel.reducer,
    selectedBrand: selectedBrand.reducer,
    toggle: toggleSlice.reducer,
    segAll: segAll.reducer,
    segCheck: segCheck.reducer,
    fuelAll: fuelAll.reducer,
    fuelCheck: fuelCheck.reducer,
    // Form데이터
    createCar: formDataSlice.reducer,
    brandList: brandListSlice.reducer,
    carList: carsListSlice.reducer,
    car: getCarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
