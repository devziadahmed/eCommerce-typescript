import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@apptypes/product";
import { handleAxiosError } from "@utils/handleAxiosError";

type Response = Product[];

const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue, signal } = thunkAPI;

  try {
    const userWishlist = await axios.get<{ productId: number }[]>("/wishlist?userId=1", {
      signal,
    });

    if (!userWishlist.data.length) {
      return fulfillWithValue([]);
    }

    const concatenatedItemsId = userWishlist.data
      .map((item) => `id=${item.productId}`)
      .join("&");

    const response = await axios.get<Response>(`/products?${concatenatedItemsId}`);

    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export default actGetWishlist;
