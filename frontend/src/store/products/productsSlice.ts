import { createSlice } from "@reduxjs/toolkit";

import { Product } from "@apptypes/product";
import { Prettify, SliceState } from "@apptypes/shared";
import actGetProductsByCat from "./thunk/actGetProductsByCat";
import { isString } from "@apptypes/guards";

type ProductsState = Prettify<SliceState> & {
  records: Product[];
};

const initialState: ProductsState = {
  records: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanProducts: (state) => {
      state.records = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCat.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCat.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCat.rejected, (state, action) => {
      state.status = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default productsSlice.reducer;
export const { cleanProducts } = productsSlice.actions;
export { actGetProductsByCat };
