import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('token');

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    data: storedToken ? JSON.parse(storedToken) : '' // Initialize the state with token data from local storage if available, otherwise an empty array
  },
  reducers: {
    setToken: (state, action) => {
      state.data = action.payload; // Update the state with the provided token data
      localStorage.setItem('token', JSON.stringify(state.data)); // Store the updated token data in local storage
    },
    resetToken: (state) => {
      state.data = ''; // Reset the token data in the state to an empty array
      localStorage.removeItem('token'); // Remove the token data from local storage
    },
  },
});

export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
