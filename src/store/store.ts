import { configureStore } from "@reduxjs/toolkit";
import { carData, fetchCarData, segmentList, fuelTypeList  } from './carFiltering'

export const store = configureStore ({
  reducer : {
    carData: carData.reducer,
    segmentList: segmentList.reducer,
    fuelTypeList: fuelTypeList.reducer,
  }
});

store.dispatch(fetchCarData());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;