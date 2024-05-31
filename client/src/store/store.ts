import { configureStore } from "@reduxjs/toolkit";
import { selectedSegSize, selectedSegBody, selectedSeg, selectedFuel, selectedBrand } from "./slice/SelectedSlice";
import { brandListSlice } from "./slice/useBrandListSlice";
import { carListSlice, getCarSlice } from "./slice/useCarSlice";
import { segAll, segCheck, fuelAll, fuelCheck } from "./slice/carCheck-slice";
import { formDataSlice } from "./slice/createCarSlice";

export const store = configureStore({
  reducer: {
    segAll: segAll.reducer,
    segCheck: segCheck.reducer,
    fuelAll: fuelAll.reducer,
    fuelCheck: fuelCheck.reducer,

    // 선택 요소 관리
    selectedSegSize: selectedSegSize.reducer,
    selectedSegBody: selectedSegBody.reducer,
    selectedSeg: selectedSeg.reducer,
    selectedFuel: selectedFuel.reducer,
    selectedBrand: selectedBrand.reducer,

    // Server, DB
    createCar: formDataSlice.reducer,
    brandList: brandListSlice.reducer,
    carList: carListSlice.reducer,
    car: getCarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
