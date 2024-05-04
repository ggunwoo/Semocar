import { createSlice } from "@reduxjs/toolkit";

// TODO : grades와 trims는 배열 형태에 상태를 가지고있고
// TODO : tsx에서 배열 객체 데이터가 들어오면 state가 통째로 바뀌도록 설계
// TODO : 그리고 formDataSlice에서 grades state를 참조, grades에선 trims state를 참조하면 끝(아마도)

const gradesInitialState = {}

const trimsInitialState = {
  trims: []
}



export const gradesFormSlice = createSlice({
  name: "grades",
  initialState: gradesInitialState,
  reducers: {},
})

export const trimsFormSlice = createSlice({
  name: "trims",
  initialState: trimsInitialState,
  reducers: {},
})
