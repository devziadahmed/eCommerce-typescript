import { createSelector, createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./thunk/actLikeToggle";
import actGetWishlist from "./thunk/actGetWishlist";
import { Status } from "@apptypes/shared";
import { Product } from "@apptypes/product";
import { RootState } from "@store/store";

type WishlistState = {
  itemsId: number[];
  productsFullInfo: Product[];
  status: Status;
  error: string | null;
};

const initialState: WishlistState = {
  itemsId: [],
  productsFullInfo: [],
  status: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanWishlist: (state) => {
      state.status = "idle";
      state.error = null;
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
      state.status = "pending";
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;

      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((id) => id !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (product) => product.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    builder.addCase(actGetWishlist.pending, (state) => {
      state.error = null;
      state.status = "pending";
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      if (action.payload) state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload && typeof action.payload === "string") state.error = action.payload;
    });
  },
});

export const getWishlistTotalQuantity = createSelector(
  (state: RootState) => state.wishlist.itemsId,
  (items) => {
    return items.length;
  }
);

export { actLikeToggle, actGetWishlist };
export const { cleanWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
