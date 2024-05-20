import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "../../api/getCarData";
import * as type from "../../types/types";
import { RootState } from "../store";

interface CarState {
  item: type.CarType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface CarListState {
  items: type.CarType[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  // editingCarId: string | null;
}

export const fetchCarList = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get(`${serverUrl}/cars`);
  return response.data;
});

export const fetchCar = createAsyncThunk<type.CarType, string>("car/getCar", async carId => {
  const response = await axios.get(`${serverUrl}/cars/${carId}`);
  return response.data;
});

export const updateCar = createAsyncThunk("car/updateCar", async (carData: type.CarType) => {
  const response = await axios.put(`${serverUrl}/cars/${carData.id}`);
  return response.data
});

export const carsListSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    status: "idle",
    error: null as string | null,
    // editingCarId: null,
  } as CarListState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCarList.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchCarList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCarList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? null;
      })
  },
});

export const getCarSlice = createSlice({
  name: "car",
  initialState: {
    item: {},
    status: "idle",
    error: null as string | null,
  } as CarState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      console.log(name, value);
      const keys = name.split("."); // --(".") 기준으로 경로 분할
      let ref = state.item; // formData 객체 초기 참조

      // ==경로 분할이 된 keys배열을 순회하면서 경로에 접근하여 참조 받은 객체를 갱신
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];

        // ==다음 키(nextKey)가 숫자인 경우에 배열에 접근
        if (!isNaN(parseInt(nextKey))) {
          ref = ref[key][parseInt(nextKey)];
          i++; // 한단계 건너뛰기
        } else {
          // 다음 키(nextKey)가 숫자가 아닌 경우 객체에 접근
          ref = ref[key];
        }
      }
      // ==접근한 필드에 속성값을 업데이트하기
      ref[keys[keys.length - 1]] = value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCar.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? null;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.item = action.payload;
      });
  },
});

export const { updateField } = getCarSlice.actions;
