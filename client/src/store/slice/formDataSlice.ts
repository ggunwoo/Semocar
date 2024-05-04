import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../api/getCarData";
import { RootState } from "../store";
import * as type from "../../types/types";
import { getGgradesInitialState, gradesFormSlice } from "./refFormSlice";

interface FormDataState {
  formData: type.CarData_Type;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FormDataState = {
  formData: {
    brand: "",
    name: "",
    english_name: "",
    id: 0,
    segment: "",
    photo_count: { exterior: 0, interior: 0 },
    price: { min: 0, max: 0 },
    date: { year: 0, month: 0 },
    gas_mileage: { min: 0, max: 0 },
    fuel_types: [],
    grades: [],
  },
  status: "idle",
  error: null,
};

// --차량 데이터 전송 함수
export const submitFormData = createAsyncThunk("form/submitDormData", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const formData = state.formSlice.formData;
    const response = await axios.post(`${serverUrl}/create/cars`, formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const formDataSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      const keys = name.split("."); // 객체 형식인지 확인 name={price.min} => ['price','min']
      if (keys.length > 1) {
        state.formData[keys[0]] = {
          ...state.formData[keys[0]],
          [keys[1]]: value,
        };
      } else {
        state.formData[name] = value;
      }
    },
    addFuelType: (state, action) => {
      const { name, fuelType } = action.payload;
      state.formData[name].push(fuelType);
      state.formData.fuel_types.sort((a, b) => a.id - b.id); // 추가 후 오름차순 정렬
    },
    removeFuelType: (state, action) => {
      const { name, fuelTypeId } = action.payload;
      state.formData[name] = state.formData[name].filter(ft => ft.id !== fuelTypeId);
      state.formData.fuel_types.sort((a, b) => a.id - b.id); // 제거 후 오름차순 정렬
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitFormData.pending, state => {
        state.status = "loading"; // 전송중
      })
      .addCase(submitFormData.fulfilled, state => {
        state.status = "succeeded"; // 전송완료
        state.formData = {
          brand: "",
          name: "",
          english_name: "",
          id: 0,
          segment: "",
          photo_count: { exterior: 0, interior: 0 },
          price: { min: 0, max: 0 },
          date: { year: 0, month: 0 },
          gas_mileage: { min: 0, max: 0 },
          fuel_types: [],
        };
        alert("전송성공!");
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.status = "failed"; // 전송실패
        state.error = action.error?.message ?? null;
        alert("전송실패!");
      });
  },
});

export const { updateField, addFuelType, removeFuelType } = formDataSlice.actions;
