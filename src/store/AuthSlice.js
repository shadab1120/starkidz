import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  auth: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { data: user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.auth = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.auth = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
