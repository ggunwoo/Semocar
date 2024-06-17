import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as type from "../../types/types";
import { submitSimpleFormData } from "../api/carApi";

interface FormDataState {
  formData: type.PostSimpleCarType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FormDataState = {
  formData: {
    brand: "",
    model: {
      name: "",
      english_name: "",
    },
    name: "",
    english_name: "",
    model_initial: "",
    is_facelift: false,
    image_path: "",
    id: "",
    segment: {
      size: "",
      body: "",
    },
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

export const SimpleformDataSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // TODO : grades, trims 같은 객체배열 처리함수
    // ==formData 상태 변경 함수
    updateFieldSP: (state, action) => {
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
    addGradeSP: state => {
      const newGrade = {
        id: String(state.formData.grades.length + 1), // --id값을 현재 길이 + 1로 설정
        name: "",
        trims: [],
      };
      state.formData.grades.push(newGrade);
    },
    // ==grade배열에 id값이 일치하는 객체 삭제 함수
    removeGradeSP: (state, action: PayloadAction<string>) => {
      state.formData.grades = state.formData.grades.filter(grade => grade.id !== action.payload);
    },
    addTrimSP: (state, action: PayloadAction<string>) => {
      const grade = state.formData.grades.find(grade => grade.id === action.payload);
      if (grade) {
        const lastTrim = grade.trims[grade.trims.length - 1];
        const newTrim = lastTrim
          ? { ...lastTrim, id: String(grade.trims.length + 1) }
          : {
              id: String(grade.trims.length + 1),
              name: "",
              field: "ICE",
              price: 0,
            };
        grade.trims.push(newTrim);
      }
    },
    // ==grade[index].trims으로 배열에 접근 뒤 id값이 일치하는 trim객체 삭제 함수
    removeTrimSP: (state, action) => {
      const { gradeIdx, id } = action.payload;
      state.formData.grades[gradeIdx].trims = state.formData.grades[gradeIdx].trims.filter(trim => trim.id !== id);
    },
    // ==fuel_types은 배열객체, 새로운 연료타입 객체 생성 및 삭제 액션함수
    addFuelTypeSP: (state, action) => {
      const { name, fuelType } = action.payload;
      state.formData[name].push(fuelType);
      state.formData.fuel_types.sort((a, b) => parseInt(a.id) - parseInt(b.id)); // --추가 후 오름차순 정렬
    },
    removeFuelTypeSP: (state, action) => {
      const { name, fuelTypeId } = action.payload;
      state.formData[name] = state.formData[name].filter(ft => ft.id !== fuelTypeId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitSimpleFormData.pending, state => {
        state.status = "loading"; // 전송중
      })
      .addCase(submitSimpleFormData.fulfilled, state => {
        state.status = "succeeded"; // 전송완료
        alert("전송성공!");
      })
      .addCase(submitSimpleFormData.rejected, (state, action) => {
        state.status = "failed"; // 전송실패
        state.error = action.error?.message ?? null;
        alert("전송실패!" + state.error);
      });
  },
});

export const { updateFieldSP, addGradeSP, removeGradeSP, addTrimSP, removeTrimSP, addFuelTypeSP, removeFuelTypeSP } =
  SimpleformDataSlice.actions;
