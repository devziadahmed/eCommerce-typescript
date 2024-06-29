import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetProductsByCat = createAsyncThunk(
  "products/getProductsByCat",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const repsonse = await axios.get(`http://localhost:5005/products?cat_prefix=${prefix}`);
      return repsonse.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

export default actGetProductsByCat;
