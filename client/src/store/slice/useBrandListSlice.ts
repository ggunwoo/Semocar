import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "../../api/getCarData";
import { fetchBrands } from "../api/brandApi";


export const brandListSlice = createSlice({
  name: "brand",
  initialState: {
    items: [],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? null;
      });
  },
});
