// userSlice.js
/**
 * When you use createSlice from Redux Toolkit, the generated reducer function is already part of the userSlice. 
 * The createSlice function encapsulates both the reducer logic and the associated action creators within the 
 * returned object, making it a self-contained slice of your Redux state.
 */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { firstName: null, lastName: null },
  reducers: {
    loginUser: (state, action) => {
      return { ...state, firstName: action.payload.firstName, lastName: action.payload.lastName };
    },
    logoutUser: (state) => {
      return { ...state, firstName: null, lastName: null };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
