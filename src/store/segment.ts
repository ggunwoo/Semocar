import { createSlice } from '@reduxjs/toolkit';
import { Form } from 'react-router-dom';

export const selectedSeg = createSlice({
  name: 'selectedSeg',
  initialState: [],
  reducers: {
    segIn: (state, action)=>{
      
    }
  },
})

export { segIn } = selectedSeg.actions;