import { createSlice } from '@reduxjs/toolkit';

const storedLoans = localStorage.getItem('loans');

const loansSlice = createSlice({
  name: 'loans',
  initialState: {
    data: storedLoans ? JSON.parse(storedLoans) : [] // Initialize the state with loans data from local storage if available, otherwise an empty array
  },
  reducers: {
    setLoans: (state, action) => {
      state.data = action.payload; // Update the state with the provided loans data
      localStorage.setItem('loans', JSON.stringify(state.data)); // Store the updated loans data in local storage
    },
    resetLoans: (state) => {
      state.data = []; // Reset the loans data in the state to an empty array
      localStorage.removeItem('loans'); // Remove the loans data from local storage
    },
  },
});

export const { setLoans, resetLoans } = loansSlice.actions;

export default loansSlice.reducer;
