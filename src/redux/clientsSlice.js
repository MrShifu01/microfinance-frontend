import { createSlice } from '@reduxjs/toolkit';

const storedClients = localStorage.getItem('clients');

const clientsSlice = createSlice({
  name: 'clients',
  initialState: { 
    data: storedClients ? JSON.parse(storedClients) : [] // Initialize the state with clients data from local storage if available, otherwise an empty array
  },
  reducers: {
    setClients: (state, action) => {
      state.data = action.payload; // Update the state with the provided clients data
      localStorage.setItem('clients', JSON.stringify(state.data)); // Store the updated clients data in local storage
    },
    resetClients: (state) => {
      state.data = []; // Reset the clients data in the state to an empty array
      localStorage.removeItem('clients'); // Remove the clients data from local storage
    },
  },
});

export const { setClients, resetClients } = clientsSlice.actions;

export default clientsSlice.reducer;
