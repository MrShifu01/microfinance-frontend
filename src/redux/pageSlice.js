import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    page: 'index', // Set the initial page to 'index'
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload; // Update the page state with the provided page value
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
