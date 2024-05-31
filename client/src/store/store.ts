import { configureStore } from "@reduxjs/toolkit";
import { selectedSegSize, selectedSegBody, selectedFuel, selectedBrand } from "./slice/selectedSlice";
import { brandListSlice } from "./slice/useBrandListSlice";
import { carListSlice, getCarSlice } from "./slice/useCarSlice";
import { formDataSlice } from "./slice/createCarSlice";
import { carListStyleSlice } from "./slice/listStyleSlice";

export const store = configureStore({
  reducer: {
    carListStyle: carListStyleSlice.reducer,
    // 선택 요소 관리
    selectedBrand: selectedBrand.reducer,
    selectedSegSize: selectedSegSize.reducer,
    selectedSegBody: selectedSegBody.reducer,
    selectedFuel: selectedFuel.reducer,
    // Server, DB
    createCar: formDataSlice.reducer,
    brandList: brandListSlice.reducer,
    carList: carListSlice.reducer,
    car: getCarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
