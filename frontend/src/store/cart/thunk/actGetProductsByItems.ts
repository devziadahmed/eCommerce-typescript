import { Product } from "@apptypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

type Response = Product[];

const actGetProductsByItems = createAsyncThunk(
  "cart/getProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    const concatenatedItemsId =
      itemsId.length > 0 ? itemsId.map((id) => `id=${id}`).join("&") : "";

    try {
      const repsonse = await axios.get<Response>(`/products?${concatenatedItemsId}`);
      return repsonse.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An expected error");
      }
    }
  }
);

export default actGetProductsByItems;
