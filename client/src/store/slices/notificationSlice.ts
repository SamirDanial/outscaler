import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  token: boolean;
  newMovie: any;
  error: string | null;
}

const initialState: NotificationState = {
  token: false,
  newMovie: null,
  error: null
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    login(state) {
      state.token = true;
    },
    logout(state) {
      state.token = false;
    },
    newMovieAdded(state, action: PayloadAction<any>) {
      state.newMovie = {
        name: action.payload.name,
        director: action.payload.director,
        mainCharecter: action.payload.mainCharecter,
      };
    },
    clearNewMovieAdded(state) {
      state.newMovie = null
    },
    addError(state, action) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    }
  },
});

export const { login, logout, newMovieAdded, clearNewMovieAdded, addError, clearError } = notificationSlice.actions;
export default notificationSlice.reducer;
