import { createSlice } from '@reduxjs/toolkit';

const segments = ['경차', '소형세단', '준중형세단', '중형세단', '준대형세단', '대형세단', '소형SUV','준중형SUV', '중형SUV', '준대형SUV', '대형SUV', 'RV', 'MPV', '픽업', '벤', '해치백', '왜건']

export const segmentList = createSlice({
  name: 'segment',
  initialState: segments,
  reducers: {},
})

export const segmentAll = createSlice({
  name: 'segmentAll',
  initialState: true,
  reducers: {
    segFullCheckTrue: state => { return state = true},
    segFullCheckFalse: state => { return state = false},
  },
})

export const segChecked = createSlice({
  name: 'segChecked',
  initialState: Array(segments.length).fill(false),
  reducers: {
    updatedCheck: (state, action) => {
      state = action.payload
    }
  },
})

export const viewSegment = createSlice({
  name: 'viewSegment',
  initialState: [],
  reducers: {
    segViewReset: state => {
      if(state.length !== 0){
        state = [];
      }
    },
    segViewAdd: (state: any[], action) => {
      const segment = action.payload
      if(state.includes(segment)){
        const updatedSegment = state.filter((item) => item !== segment);
        state = updatedSegment
      } else {
        let copySegment = [...state, segment]
        state = copySegment
      }
    },
  },
})

// export action
export const { segFullCheckTrue, segFullCheckFalse } = segmentAll.actions;
export const { segViewReset, segViewAdd } = viewSegment.actions;
export const { updatedCheck } = segChecked.actions;