import { createSlice } from "@reduxjs/toolkit";

export const carListStyleSlice = createSlice({
  name: "carListStyle",
  initialState: "4",
  reducers: {
    changeCarListStyle: (state, action) => {
      state = action.payload;
    }
  }
})

export const { changeCarListStyle } = carListStyleSlice.actions;