import { createSlice } from '@reduxjs/toolkit';

const fuelTypes =['가솔린', '디젤', 'LPG', '하이브리드', '전기', '수소']
export const fuelType = createSlice({
  name: 'fuelType',
  initialState: fuelTypes,
  reducers: {},
})