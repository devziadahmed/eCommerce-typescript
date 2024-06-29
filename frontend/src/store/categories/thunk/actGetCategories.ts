import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "@apptypes/category";

const actGetCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.get<Category[]>("http://localhost:5005/categories");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message || error.message);
    } else if (error instanceof Error && error.message) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unexpected error");
    }
  }
});

export default actGetCategories;
