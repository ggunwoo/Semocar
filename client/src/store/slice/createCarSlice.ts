import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../api/getCarData";
import { RootState } from "../store";
import * as type from "../../types/types";

interface FormDataState {
  formData: type.CarDataType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FormDataState = {
  formData: {
    brand: "",
    name: "",
    english_name: "",
    model_initial: "",
    id: "",
    segment: "",
    photo_count: { exterior: 0, interior: 0 },
    price: { min: 0, max: 0 },
    date: { year: 0, month: 1 },
    fuel_types: [],
    grades: [
      {
        id: "1",
        name: "",
        trims: [],
      },
    ],
  },
  status: "idle",
  error: null,
};

// --차량 데이터 전송 함수
export const submitFormData = createAsyncThunk("form/submitFormData", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const formData = state.createCar.formData;
    const response = await axios.post(`${serverUrl}/create/cars`, formData);
    console.log(`${serverUrl}/create/cars`)
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Unknown error");
  }
});

export const formDataSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // TODO : grades, trims 같은 객체배열 처리함수
    // ==formData 상태 변경 함수
    updateField: (state, action) => {
      const { name, value } = action.payload;
      console.log(name, value);
      const keys = name.split("."); // --(".") 기준으로 경로 분할
      let ref = state.formData; // formData 객체 초기 참조

      // ==경로 분할이 된 keys배열을 순회하면서 경로에 접근하여 참조 받은 객체를 갱신
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];

        // ==다음 키(nextKey)가 숫자인 경우에 배열에 접근
        if (!isNaN(parseInt(nextKey))) {
          ref = ref[key][parseInt(nextKey)];
          i++; // 한단계 건너뛰기
        } else {
          // 다음 키(nextKey)가 숫자가 아닌 경우 객체에 접근
          ref = ref[key];
        }
      }
      // ==접근한 필드에 속성값을 업데이트하기
      ref[keys[keys.length - 1]] = value;
    },
    // ==grade배열에 객체 추가 함수
    addGrade: state => {
      const newGrade = {
        id: state.formData.grades.length + 1, // --id값을 현재 길이 + 1로 설정
        name: "",
        trims: [],
      };
      state.formData.grades.push(newGrade);
    },
    // ==grade배열에 id값이 일치하는 객체 삭제 함수
    removeGrade: (state, action: PayloadAction<number>) => {
      state.formData.grades = state.formData.grades.filter(grade => grade.id !== action.payload);
    },
    addTrim: (state, action: PayloadAction<number>) => {
      const grade = state.formData.grades.find(grade => grade.id === action.payload);
      if (grade) {
        console.log("생성");
        const newTrim: type.TrimType = {
          // 기본값 ICE 필드
          id: grade.trims.length + 1,
          name: "",
          field: "ICE",
          price: 0,
          fuel_type: "",
          engine: "",
          displacement: 0,
          trans_mission: {
            gear: "",
            type: "",
          },
          driving_system: "",
          power: 0,
          torque: 0,
          gas_mileage: 0,
          urban_gas_mileage: 0,
          highway_gas_mileage: 0,
          low_emission: "",
          vehicle_weight: 0,
          front_tire: "",
          rear_tire: "",
          front_brake: "",
          rear_brake: "",
          front_suspension: "",
          rear_suspension: "",
          capacity: 0,
          length: 0,
          weight: 0,
          height: 0,
          wheel_base: 0,
          track: 0,
          tread: 0,
          motor_power: 0,
          motor_torque: 0,
          battery_type: "",
          battery_volume: 0,
          battery_voltage: 0,
          ev_mileage: 0,
          urban_ev_mileage: 0,
          highway_ev_mileage: 0,
          range: 0,
          urban_range: 0,
          highway_range: 0,
        };
        grade.trims.push(newTrim);
      }
    },
    // ==grade[index].trims으로 배열에 접근 뒤 id값이 일치하는 trim객체 삭제 함수
    removeTrim: (state, action) => {
      const { gradeIdx, id } = action.payload;
      state.formData.grades[gradeIdx].trims = state.formData.grades[gradeIdx].trims.filter(trim => trim.id !== id);
    },
    // ==fuel_types은 배열객체, 새로운 연료타입 객체 생성 및 삭제 액션함수
    addFuelType: (state, action) => {
      const { name, fuelType } = action.payload;
      state.formData[name].push(fuelType);
      state.formData.fuel_types.sort((a, b) => parseInt(a.id) - parseInt(b.id)); // --추가 후 오름차순 정렬
    },
    removeFuelType: (state, action) => {
      const { name, fuelTypeId } = action.payload;
      state.formData[name] = state.formData[name].filter(ft => ft.id !== fuelTypeId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitFormData.pending, state => {
        state.status = "loading"; // 전송중
      })
      .addCase(submitFormData.fulfilled, state => {
        state.status = "succeeded"; // 전송완료
        alert("전송성공!");
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.status = "failed"; // 전송실패
        state.error = action.error?.message ?? null;
        alert("전송실패!" + state.error);
      });
  },
});

export const { updateField, addGrade, removeGrade, addTrim, removeTrim, addFuelType, removeFuelType } =
  formDataSlice.actions;
