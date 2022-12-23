import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { PageType } from '../types/types';

type InitialStateType = {
  pages: PageType[]
}

const initialState:InitialStateType = {
  pages: []
}

export const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    get_pages: (state, action) => {
      state.pages = action.payload
    }
  },
});

export const { get_pages } = pageSlice.actions;

export const selectPage = (state: RootState) => state.page.pages;

export default pageSlice.reducer;