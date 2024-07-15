import { createSlice } from "@reduxjs/toolkit";

// --Detail 페이지 : 등급 및 트립 선택
export const selectGradeSlice = createSlice({
  name: "gradeSelect",
  initialState: {
    selectGrade: "1",
    selectTrim: "1",
  },
  reducers: {
    setGrade: (state, action) => {
      state.selectGrade = action.payload;
    },
    setTrim: (state, action) => {
      state.selectTrim = action.payload;
    },
  },
});

export const { setGrade, setTrim } = selectGradeSlice.actions;
