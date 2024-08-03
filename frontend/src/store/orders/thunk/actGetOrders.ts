import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { OrderProduct } from "@apptypes/orders";
import { RootState } from "@store/store";
import { handleAxiosError } from "@utils/handleAxiosError";

type Response = OrderProduct[];

const actGetOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue, getState, signal }) => {
    const { auth } = getState() as RootState;

    try {
      const res = await axios.get<Response>(`/orders?userId=${auth.user?.id}`, {
        signal,
      });
      return res.data;
    } catch (error) {
      rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetOrders;
