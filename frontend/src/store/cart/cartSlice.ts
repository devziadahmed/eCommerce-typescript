import { Product } from "@apptypes/product";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

type CartState = {
  items: { [key: number]: number };
  productFullInfo: (Product & { quantity: number })[];
  totalItemsQuantity: number;
};

const initialState: CartState = {
  items: {},
  productFullInfo: [],
  totalItemsQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
});

export const getCartTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return Object.values(items).reduce((acc, curr) => acc + curr, 0);
  }
);

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
