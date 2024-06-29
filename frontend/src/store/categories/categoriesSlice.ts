import { createSlice } from "@reduxjs/toolkit";

import { Prettify, SliceState, Status } from "@apptypes/shared";
import { Category } from "@apptypes/category";
import actGetCategories from "./thunk/actGetCategories";

type CategoriesState = Prettify<SliceState> & {
  records: Category[];
};

const initialState: CategoriesState = {
  records: [],
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.status = "failed";
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export default categoriesSlice.reducer;
export { actGetCategories };
