import { createSlice } from '@reduxjs/toolkit';

// Get the stored user data from localStorage
const storedUser = localStorage.getItem('user');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: storedUser ? JSON.parse(storedUser) : null, // Initialize the user data from localStorage or as null if not available
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload; // Update the user data in the state with the payload
      localStorage.setItem('user', JSON.stringify(state.data)); // Store the updated user data in localStorage
    },
    setTempUser: (state, action) => {
      state.data = action.payload; // Update the user data in the state with the payload
      localStorage.removeItem('user'); // Remove the user data from localStorage
    },
    resetUser: (state) => {
      state.data = null; // Reset the user data in the state to null
      localStorage.removeItem('user'); // Remove the user data from localStorage
    },
  },
});

export const { setUser, setTempUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
