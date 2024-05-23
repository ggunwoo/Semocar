import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { serverUrl } from "../../api/getCarData";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  const response = await axios.get(`${serverUrl}/brands`);
  return response.data;
});
