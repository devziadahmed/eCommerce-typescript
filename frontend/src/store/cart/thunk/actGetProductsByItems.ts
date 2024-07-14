import axios from "axios";
import { Product } from "@apptypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { handleAxiosError } from "@utils/handleAxiosError";

type Response = Product[];

const actGetProductsByItems = createAsyncThunk(
  "cart/getProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    const concatenatedItemsId =
      itemsId.length > 0 ? itemsId.map((id) => `id=${id}`).join("&") : "";

    try {
      const repsonse = await axios.get<Response>(`/products?${concatenatedItemsId}`, {
        signal,
      });
      return repsonse.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetProductsByItems;
