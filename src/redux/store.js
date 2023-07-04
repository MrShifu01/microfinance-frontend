import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageSlice';
import clientsReducer from './clientsSlice';
import loansReducer from './loansSlice';
import userReducer from './userSlice';
import settingsReducer from './settingsSlice';
import tokenReducer from './tokenSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer, // Reducer for managing token state
    settings: settingsReducer, // Reducer for managing settings state
    user: userReducer, // Reducer for managing user state
    loans: loansReducer, // Reducer for managing loans state
    clients: clientsReducer, // Reducer for managing clients state
    page: pageReducer, // Reducer for managing page state
  },
});

export default store;
