import { createSlice } from '@reduxjs/toolkit';

export const fuelTypeList = createSlice({
  name: 'fuelType',
  initialState: ['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소'],
  reducers: {},
})

export const fuelTypeAll = createSlice({
  name: 'fuelTypeAll',
  initialState: true,
  reducers: {
    fuelTypeAllHandle: (state) => { state = true; }
  },
})

export const postfuelType = createSlice({
  name: 'postfuelType',
  initialState: [],
  reducers: {},
})

export const { fuelTypeAllHandle } = fuelTypeAll.actions;