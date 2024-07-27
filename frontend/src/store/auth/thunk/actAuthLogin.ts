import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "@utils/handleAxiosError";
import { FormData } from "./actAuthRegister";

type LoginFormData = Pick<FormData, "email" | "password">;

type Response = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actAuthLogin = createAsyncThunk(
  "auth/authLogin",
  async (formData: LoginFormData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const res = await axios.post<Response>("/login", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actAuthLogin;
