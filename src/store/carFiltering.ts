import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCarData } from '../api/getCarData';

// GET carData
export const fetchCarData = createAsyncThunk('carData/fetchCarData', async () => {
  const res = await getCarData();
  return res
})

export const carData = createSlice({
  name: 'carData',
  initialState: [],
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchCarData.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})
export const segmentList = createSlice({
  name: 'segment',
  initialState: ['경차', '소형세단', '준중형세단', '중형세단', '준대형세단', '대형세단', '소형SUV','준중형SUV', '중형SUV', '준대형SUV', '대형SUV', 'RV', 'MPV', '픽업', '벤', '해치백', '왜건'],
  reducers: {},
})
export const segmentAllChecked = createSlice({
  name: 'segmentChecked2',
  initialState: true,
  reducers: {},
})
export const postSegment = createSlice({
  name: 'postSegment',
  initialState: [],
  reducers: {},
})
export const fuelTypeList = createSlice({
  name: 'fuelType',
  initialState: ['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소'],
  reducers: {},
})
export const fuelTypeAllChecked = createSlice({
  name: 'fuelTypeChecked2',
  initialState: true,
  reducers: {},
})
export const postfuelType = createSlice({
  name: 'postfuelType',
  initialState: [],
  reducers: {},
})
