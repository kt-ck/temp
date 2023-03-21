import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface MainState {
  authState: boolean;
  username: string;
}

// Initial state
const initialState: MainState = {
  authState: false,
  username: "",
};

// Actual Slice
export const mainSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState,setUsername } = mainSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUserName = (state: AppState) => state.auth.username

export default mainSlice.reducer;
