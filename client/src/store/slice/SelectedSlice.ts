import { createSlice } from "@reduxjs/toolkit";

export const selectedBrand = createSlice({
  name: "brand",
  initialState: [] as string[],
  reducers: {
    brandIn: (state, action) => {
      const brandId = action.payload;
      if (state.includes(brandId)) {
        // 값은 값 체크 해제
        const updatedBrand = state.filter((stateId: string) => stateId !== brandId);
        return updatedBrand;
      } else {
        state.push(brandId);
      }
    },
    brandReset: state => {
      if (state.length !== 0) {
        return [];
      }
    },
  },
});

export const selectedSegSize = createSlice({
  name: "segmentSize",
  initialState: [] as string[],
  reducers: {
    segSizeIn: (state, action) => {
      const size = action.payload;
      if (state.includes(size)) {
        const updatedSize = state.filter((item: string) => item !== size);
        return updatedSize;
      } else {
        let copySize = [...state, size];
        return copySize;
      }
    },
    segSizeReset: state => {
      if (state.length !== 0) {
        return [];
      }
    },
  },
});
export const selectedSegBody = createSlice({
  name: "segmentBody",
  initialState: [] as string[],
  reducers: {
    segBodyIn: (state, action) => {
      const body = action.payload;
      if (state.includes(body)) {
        const updatedBody = state.filter((item: string) => item !== body);
        return updatedBody;
      } else {
        let copyBody = [...state, body];
        return copyBody;
      }
    },
    segBodyReset: state => {
      if (state.length !== 0) {
        return [];
      }
    },
  },
});
export const selectedFuel = createSlice({
  name: "fuelType",
  initialState: [] as string[],
  reducers: {
    fuelIn: (state, action) => {
      const fuelType = action.payload;
      if (state.includes(fuelType)) {
        const updatedFuelType = state.filter((item: string) => item !== fuelType);
        return updatedFuelType;
      } else {
        const copyFuelType = [...state, fuelType];
        return copyFuelType;
      }
    },
    fuelReset: state => {
      if (state.length !== 0) {
        return [];
      }
    },
  },
});

export const { brandIn, brandReset } = selectedBrand.actions;
export const { segSizeIn, segSizeReset } = selectedSegSize.actions;
export const { segBodyIn, segBodyReset } = selectedSegBody.actions;
export const { fuelIn, fuelReset } = selectedFuel.actions;

export const selectedSeg = createSlice({
  name: "segment",
  initialState: [] as string[],
  reducers: {
    segIn: (state, action) => {
      const segment = action.payload;
      if (state.includes(segment)) {
        const updatedSegment = state.filter((item: string) => item !== segment);
        return updatedSegment;
      } else {
        let copySegment = [...state, segment];
        return copySegment;
      }
    },
    segReset: state => {
      if (state.length !== 0) {
        return [];
      }
    },
  },
});

export const { segIn, segReset } = selectedSeg.actions;
