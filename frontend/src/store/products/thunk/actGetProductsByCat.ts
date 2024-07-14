import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "@utils/handleAxiosError";

const actGetProductsByCat = createAsyncThunk(
  "products/getProductsByCat",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const repsonse = await axios.get(`/products?cat_prefix=${prefix}`, { signal });
      return repsonse.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProductsByCat;
