import axios from "axios";
import * as type from "../../types/types";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "../../../utils/constants";

interface FilterParams {
  selectBrand: string[];
  selectSegSize: string[];
  selectSegBody: string[];
  selectFuel: string[];
}

// --폼 데이터 DB전송
export const submitFormData = createAsyncThunk("form/submitFormData", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const formData = state.createCar.formData;
    console.log("Sending formData:", formData); // 전송 전 formData 로그 출력
    const response = await axios.post(`${serverUrl}/create/car`, formData);
    console.log(`${serverUrl}/create/cars`);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Unknown error");
  }
});

// --전체 데이터 리스트 호출
export const fetchCarAllList = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get(`${serverUrl}/get/cars`);
  return response.data;
});

// -- 데이터 리스트 호출
export const fetchCarList = createAsyncThunk(
  "cars/fetchFilteredCars",
  async ({ selectBrand, selectSegSize, selectSegBody, selectFuel }: FilterParams) => {
    let query = "";
    if (selectBrand.length) {
      query += `brand=${selectBrand.join(",")}&`;
    }
    if (selectSegSize.length) {
      query += `size=${selectSegSize.join(",")}&`;
    }
    if (selectSegBody.length) {
      query += `body=${selectSegBody.join(",")}&`;
    }
    if (selectFuel.length) {
      query += `fuel=${selectFuel.join(",")}&`;
    }
    console.log("query: ", query);

    const response = await axios.get(`${serverUrl}/get/cars?${query}`);
    const carList = response.data;

    const modelMap: { [key: string]: type.ModelListType } = {};
    carList.forEach(car => {
      const modelName = car.model.english_name;
      // 객체에 키값이 존재하지않으면 빈 배열 생성
      if (!modelMap[modelName]) {
        modelMap[modelName] = {
          model: modelName,
          name: car.model.name,
          generations: [],
          segment: car.segment.size + car.segment.body,
          fuel_types: [],
        };
      }
      // 배열에 객체 추가
      modelMap[modelName].generations.push(car);

      car.fuel_types.forEach(fuel => {
        if (!modelMap[modelName].fuel_types.includes(fuel.name)) {
          modelMap[modelName].fuel_types.push(fuel.name);
        }
      });
    });
    // 세대별 차량을 배열 형식으로 오름차순 저장(generations)
    const createModelMap = Object.keys(modelMap).map(modelName => {
      const sortedGenerations = modelMap[modelName].generations.sort((a, b) => {
        const dateA: number = new Date(a.date.year, a.date.month - 1).getTime();
        const dateB: number = new Date(b.date.year, b.date.month - 1).getTime();
        return dateB - dateA;
      });

      return {
        model: modelName,
        name: modelMap[modelName].name,
        generations: sortedGenerations,
        segment: modelMap[modelName].segment,
        fuel_types: Array.from(modelMap[modelName].fuel_types) as string[], // Set을 배열로 변환
      };
    });
    console.log(createModelMap);
    return createModelMap;
  }
);

// --특정 데이터 호출
export const fetchCar = createAsyncThunk<type.CarType, string>("car/getCar", async carId => {
  const response = await axios.get(`${serverUrl}/get/cars/${carId}`);
  return response.data;
});

// -- 데이터 수정
export const updateCar = createAsyncThunk("car/updateCar", async (carData: type.CarType) => {
  const response = await axios.put(`${serverUrl}/get/cars/${carData.id}`);
  return response.data;
});
