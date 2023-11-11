import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { counterSlice } from './counter';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    counter: counterSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
