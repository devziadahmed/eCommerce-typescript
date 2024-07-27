import { createSlice } from "@reduxjs/toolkit";
import { SliceState } from "@apptypes/shared";
import actAuthRegister from "./thunk/actAuthRegister";
import { isString } from "@apptypes/guards";
import actAuthLogin from "./thunk/actAuthLogin";

const initialState: SliceState & {
  unlockedPage: string | null;
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
} = {
  status: "idle",
  error: null,
  accessToken: null,
  user: null,
  unlockedPage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.status = "idle";
      state.error = null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    setUnlockedPage: (state, action) => {
      state.unlockedPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(actAuthRegister.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.status = "failed";

      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.accessToken = isString(action.payload?.accessToken)
        ? action.payload.accessToken
        : null;
      state.user = action.payload?.user ? action.payload.user : null;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.status = "failed";

      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { resetUI, logout, setUnlockedPage } = authSlice.actions;
export default authSlice.reducer;
