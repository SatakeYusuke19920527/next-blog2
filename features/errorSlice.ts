import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { ErrorType } from '../types/types';

type InitialStateType = {
  error: ErrorType
}

const initialState:InitialStateType = {
  error: {code: "", message: ""}
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    error: (state, action) => {
      console.log("🚀 ~ file: errorSlice.ts:22 ~ action", action.payload)  
      state.error = action.payload
    },
    no_error: (state) => {
      state.error = initialState.error
    }
  },
});

export const { error,no_error } = errorSlice.actions;

export const selectError = (state: RootState) => state.error.error;

export default errorSlice.reducer;