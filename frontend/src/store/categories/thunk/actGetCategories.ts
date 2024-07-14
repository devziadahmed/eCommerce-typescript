import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Category } from "@apptypes/category";
import { handleAxiosError } from "@utils/handleAxiosError";

const actGetCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
  const { rejectWithValue, signal } = thunkAPI;
  try {
    const response = await axios.get<Category[]>("/categories", { signal });
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export default actGetCategories;
