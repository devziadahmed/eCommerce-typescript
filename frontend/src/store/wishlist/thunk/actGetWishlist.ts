import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@apptypes/product";

type Response = Product[];

const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async (_, thunkAPI) => {
  const { fulfillWithValue, rejectWithValue } = thunkAPI;

  try {
    const userWishlist = await axios.get<{ productId: number }[]>("/wishlist?userId=1");

    if (!userWishlist.data.length) {
      return fulfillWithValue([]);
    }

    const concatenatedItemsId = userWishlist.data
      .map((item) => `id=${item.productId}`)
      .join("&");

    const response = await axios.get<Response>(`/products?${concatenatedItemsId}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      rejectWithValue(error.response?.data.message || error.message);
    } else {
      return rejectWithValue("Something went wrong!");
    }
  }
});

export default actGetWishlist;
