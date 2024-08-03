import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleAxiosError } from "@utils/handleAxiosError";
import { RootState } from "@store/store";

const actPlaceOrder = createAsyncThunk(
  "orders/placeOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth, cart } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.img,
        quantity: product.id && cart.items[product.id],
      };
    });

    try {
      const res = await axios.post("/orders", {
        userId: auth.user?.id,
        items: orderItems,
        subtotal,
      });

      return res.data;
    } catch (error) {
      rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actPlaceOrder;
