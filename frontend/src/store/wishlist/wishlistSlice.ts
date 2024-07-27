import { createSelector, createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./thunk/actLikeToggle";
import actGetWishlist from "./thunk/actGetWishlist";
import { logout } from "@store/auth/authSlice";
import { Status } from "@apptypes/shared";
import { Product } from "@apptypes/product";
import { RootState } from "@store/store";
import { isString } from "@apptypes/guards";

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
      if (action.payload && isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.error = null;
      state.status = "pending";
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.payload.dataType === "productsFullInfo") {
        state.productsFullInfo = action.payload.data as Product[];
      } else if (action.payload.dataType === "productIds") {
        state.itemsId = action.payload.data as number[];
      } else {
        state.productsFullInfo = [];
        state.itemsId = [];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.status = "failed";
      if (action.payload && isString(action.payload)) state.error = action.payload;
    });

    // logout reset
    builder.addCase(logout, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
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
