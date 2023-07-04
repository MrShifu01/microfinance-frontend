import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: false, // Represents the state of the settings (true/false)
    column: false, // Represents the state of the column option (true/false)
    pagination: false, // Represents the state of the pagination option (true/false)
    delete: false, // Represents the state of the delete option (true/false)
  },
  reducers: {
    toggleColumn: (state) => {
      state.column = !state.column; // Toggles the value of the column state (true -> false, false -> true)
    },
    togglePagination: (state) => {
      state.pagination = !state.pagination; // Toggles the value of the pagination state (true -> false, false -> true)
    },
    toggleSettings: (state) => {
      state.settings = !state.settings; // Toggles the value of the settings state (true -> false, false -> true)
    },
    toggleDelete: (state) => {
      state.delete = !state.delete; // Toggles the value of the delete state (true -> false, false -> true)
    },
  },
});

export const {
  toggleColumn,
  togglePagination,
  toggleSettings,
  toggleDelete,
} = settingsSlice.actions;

export default settingsSlice.reducer;
