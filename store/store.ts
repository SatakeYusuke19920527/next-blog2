import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import errorReducer from '../features/errorSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;