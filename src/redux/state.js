import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = {
  userData: {},
  loggedIn: false,
  darkMode: "light"
};


export const loggedIn = createSlice({
  name: "allStates",
  initialState: { value: initialStateValue },
  reducers: {
    updateUser: (state, action) => {
      state.value.userData = action.payload;
    },
    updateLoggedIn: (state, action) => {
      state.value.loggedIn = action.payload
    },
    updateDarkMode: (state, action) => {
      state.value.darkMode = action.payload
    }
  },
});

export const { updateUser, updateLoggedIn, updateDarkMode } = loggedIn.actions;

export default loggedIn.reducer;
