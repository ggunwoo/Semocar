import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCarData } from '../api/getCarData';

// GET carData
export const fetchCarData = createAsyncThunk('carData/fetchCarData', async () => {
  try {
    const res = await getCarData();
    return res;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const carData = createSlice({
  name: 'carData',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarData.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});