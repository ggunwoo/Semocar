import { createSlice } from "@reduxjs/toolkit";
import { segments } from "../../../utils/constants";

export const fuelList = ["가솔린", "디젤", "LPG", "하이브리드", "전기", "수소"];

export const segAll = createSlice({
  name: "segAll",
  initialState: true,
  reducers: {
    segAllChange: (state, action) => {
      return action.payload;
    },
  },
});

export const segCheck = createSlice({
  name: "segCheck",
  initialState: Array(segments.length).fill(false),
  reducers: {
    segHandle: (state, action) => {
      return action.payload;
    },
  },
});

export const fuelAll = createSlice({
  name: "fuelAll",
  initialState: true,
  reducers: {
    fuelAllChange: (state, action) => {
      return action.payload;
    },
  },
});

export const fuelCheck = createSlice({
  name: "fuelCheck",
  initialState: Array(fuelList.length).fill(false),
  reducers: {
    fuelHandle: (state, action) => {
      return action.payload;
    },
  },
});

export const { segAllChange } = segAll.actions;
export const { segHandle } = segCheck.actions;
export const { fuelAllChange } = fuelAll.actions;
export const { fuelHandle } = fuelCheck.actions;
