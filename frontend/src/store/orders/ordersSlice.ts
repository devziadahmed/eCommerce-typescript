import { createSlice } from "@reduxjs/toolkit";

import { Prettify, SliceState } from "@apptypes/shared";
import { OrderProduct } from "@apptypes/orders";
import actPlaceOrder from "./thunk/actPlaceOrder";
import { isString } from "@apptypes/guards";
import actGetOrders from "./thunk/actGetOrders";

type OrdersState = Prettify<
  SliceState & {
    orderList: OrderProduct[] | null;
  }
>;

const initialState: OrdersState = {
  status: "idle",
  error: null,
  orderList: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // place order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.orderList = action.payload;
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = isString(action.payload) ? action.payload : null;
    });

    // getOrders
    builder.addCase(actGetOrders.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.orderList = action.payload ?? null;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = isString(action.payload) ? action.payload : null;
    });
  },
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
