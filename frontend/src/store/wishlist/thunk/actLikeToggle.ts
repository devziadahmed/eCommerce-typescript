import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleAxiosError } from "@utils/handleAxiosError";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`, { signal });

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", { userId: "1", productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actLikeToggle;
