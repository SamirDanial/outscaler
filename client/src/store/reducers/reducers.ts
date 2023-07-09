import { combineReducers } from '@reduxjs/toolkit';
import notificationReducer from '../slices/notificationSlice';

const rootReducer = combineReducers({
  notification: notificationReducer,
});

export default rootReducer;
