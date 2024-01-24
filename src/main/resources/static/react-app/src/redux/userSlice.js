// userSlice.js
/**
 * When you use createSlice from Redux Toolkit, the generated reducer function is already part of the userSlice. 
 * The createSlice function encapsulates both the reducer logic and the associated action creators within the 
 * returned object, making it a self-contained slice of your Redux state.
 */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { firstName: null, lastName: null, email: null, userName: null, userId: null },
  reducers: {
    updateUser: (state, action) => {
      return { 
        ...state, 
        firstName: action.payload.firstName, 
        lastName: action.payload.lastName,
        email: action.payload.email,
        userName: action.payload.userName,
        userId: action.payload.userId
      };
    },
    logoutUser: (state) => {
      return { ...state, firstName: null, lastName: null };
    },
  },
});

export const { logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
