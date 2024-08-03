import { Product } from "@apptypes/product";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import actGetProductsByItems from "./thunk/actGetProductsByItems";
import { Status } from "@apptypes/shared";
import { isString } from "@apptypes/guards";

type CartState = {
  items: { [key: string]: number };
  productsFullInfo: (Product & { quantity?: number })[];
  totalItemsQuantity: number;
  status: Status;
  error: string | null;
};

const initialState: CartState = {
  items: {},
  productsFullInfo: [],
  totalItemsQuantity: 0,
  status: "idle",
  error: null,
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
    cartItemChangeQuntity: {
      prepare(id: number, quantity: number) {
        return {
          payload: {
            id,
            quantity,
          },
        };
      },
      reducer(state, action: PayloadAction<{ id: number; quantity: number }>) {
        state.items[action.payload.id] = action.payload.quantity;
      },
    },
    deleteCartItem: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (product) => product.id !== action.payload
      );
    },
    cleanCartProducts: (state) => {
      state.productsFullInfo = [];
    },
    resetCart: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.status = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const getCartTotalQuantity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    return Object.values(items).reduce((acc, curr) => acc + curr, 0);
  }
);

export const {
  addToCart,
  cartItemChangeQuntity,
  deleteCartItem,
  cleanCartProducts,
  resetCart,
} = cartSlice.actions;
export { actGetProductsByItems };
export default cartSlice.reducer;
