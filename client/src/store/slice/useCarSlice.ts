import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "../../api/getCarData";
import * as type from "../../types/types";

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

export const carsListSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    status: "idle",
    error: null as string | null,
    // editingCarId: null,
  } as CarListState,
  reducers: {
    // setEditingCarId: (state, action) => {
    //   state.editingCarId = action.payload;
    // },
    // cancelEditing: state => {
    //   state.editingCarId = null;
    // },
  },
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
      });
  },
});

export const getCarSlice = createSlice({
  name: "car",
  initialState: {
    item: {},
    status: "idle",
    error: null as string | null,
  } as CarState,
  reducers: {},
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
      });
  },
});
