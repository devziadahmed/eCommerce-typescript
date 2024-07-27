import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "@utils/handleAxiosError";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/authRegister",
  async (formData: FormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axios.post("/register", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actAuthRegister;
