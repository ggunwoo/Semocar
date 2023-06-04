import { createSlice } from '@reduxjs/toolkit'

export const selectedSeg = createSlice({
  name: 'selectedSeg',
  initialState: [] as string[],
  reducers: {
    segIn: (state, action)=>{
      const segment = action.payload
      if(state.includes(segment)){
        const updatedSegment = state.filter((item:string) => item !== segment);
        return updatedSegment
      } else {
        let copySegment = [...state, segment]
        return copySegment
      }
    },
    segReset: (state)=>{
      if(state.length !== 0){
        return []
      }
    },
  },
})

export const { segIn, segReset } = selectedSeg.actions;