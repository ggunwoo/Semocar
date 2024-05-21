import { createSlice } from "@reduxjs/toolkit";

export const segList = [
  "경차",
  "소형세단",
  "준중형세단",
  "중형세단",
  "준대형세단",
  "대형세단",
  "소형SUV",
  "준중형SUV",
  "중형SUV",
  "준대형SUV",
  "대형SUV",
  "RV",
  "MPV",
  "픽업",
  "벤",
  "쿠페",
  "해치백",
  "왜건",
];
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
  initialState: Array(segList.length).fill(false),
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
