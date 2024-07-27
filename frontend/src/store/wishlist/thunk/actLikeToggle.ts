import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleAxiosError } from "@utils/handleAxiosError";
import { RootState } from "@store/store";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=${auth.user?.id}&productId=${id}`,
        { signal }
      );

      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id };
      } else {
        await axios.post("/wishlist", { userId: auth.user?.id, productId: id });
        return { type: "add", id };
      }
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

export default actLikeToggle;
