import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@apptypes/product";
import { handleAxiosError } from "@utils/handleAxiosError";
import { RootState } from "@store/store";

type DataType = "productsFullInfo" | "productIds";
type Response = Product[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: DataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;

    const { auth } = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        {
          signal,
        }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "productIds") {
        const concatenatedItemsId = userWishlist.data.map((item) => item.productId);
        return { data: concatenatedItemsId, dataType: "productIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((item) => `id=${item.productId}`)
          .join("&");

        const response = await axios.get<Response>(`/products?${concatenatedItemsId}`);
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actGetWishlist;
