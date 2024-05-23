import axios from "axios";
import * as type from "../../types/types";
import { RootState } from "../store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "../../api/getCarData";

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

// -- 데이터 전체 리스트 호출
export const fetchCarAllList = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get(`${serverUrl}/cars`);
  return response.data;
});

// --데이터 Model 구분 객체 형식으로 호출
export const fetchCarMaps = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get(`${serverUrl}/cars`);
  const carList = response.data;
  const modelMap = {};
  carList.forEach(car => {
    const modelName = car.model;
    // 객체에 키값이 존재하지않으면 빈 배열 생성
    if (!modelMap[modelName]) {
      modelMap[modelName] = {
        generations: [],
        segment: car.segment,
        fuel_types: new Set(),
      };
    }
    // 배열에 객체 추가
    modelMap[modelName].generations.push(car);
    car.fuel_types.forEach(fuel => modelMap[modelName].fuel_types.add(fuel.name));
  });
  // 세대별 차량을 배열 형식으로 오름차순 저장(generations)
  const carMaps = Object.keys(modelMap).map(modelName => {
    const sortedGenerations = modelMap[modelName].generations.sort((a, b) => {
      const dateA: number = new Date(a.date.year, a.date.month - 1).getTime();
      const dateB: number = new Date(b.date.year, b.date.month - 1).getTime();
      return dateB - dateA;
    });

    return {
      model: modelName,
      generations: sortedGenerations,
      segment: modelMap[modelName].segment,
      fuel_types: Array.from(modelMap[modelName].fuel_types),
    };
  });

  console.log(carMaps);

  return carMaps;
});

// --특정 데이터 호출
export const fetchCar = createAsyncThunk<type.CarType, string>("car/getCar", async carId => {
  const response = await axios.get(`${serverUrl}/cars/${carId}`);
  return response.data;
});

// -- 데이터 수정
export const updateCar = createAsyncThunk("car/updateCar", async (carData: type.CarType) => {
  const response = await axios.put(`${serverUrl}/cars/${carData.id}`);
  return response.data;
});