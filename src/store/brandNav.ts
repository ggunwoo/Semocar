import { createSlice } from "@reduxjs/toolkit";

const brandList = ['현대', '기아', 'KG', '제네시스', '르노코리아', '쉐보레']

export const brand = createSlice({
  name: 'brand',
  initialState: brandList,
  reducers: {},
})

export const toggle = createSlice({
  name: 'toggle',
  initialState: Array(brandList.length).fill(false),
  reducers: {
    toggleHandler: (state, action)=>{
      const index = action.payload;
      if(state[index] === false){
        state.fill(false);
        state[index] = true;
      } else if (state[index] === true) {
        state[index] = false;
      }
    },
    toggleReset: (state)=>{
      state.fill(false);
    }

  },
})

export const { toggleHandler, toggleReset } = toggle.actions;