import { createSlice } from '@reduxjs/toolkit';
import { NotificationsStateType } from './stateTypes';
import { hideNotification, showNotification } from './actions';

const initialState: NotificationsStateType = {
  type: null,
  title: '',
  message: ''
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showNotification, (state, action) => {
      return action.payload;
    });
    builder.addCase(hideNotification, (state, action) => {
      return initialState;
    });
  }
});

export default notificationsSlice.reducer;
