import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { SelectPageInfoType } from '../types/types';

type InitialStateType = {
  pageInfo: SelectPageInfoType
}

const initialState:InitialStateType = {
  pageInfo: {
    title: "",
    url: ""
  }
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    selectPageInfo: (state, action) => {
      state.pageInfo = action.payload
    },
    refreshPageInfo: (state) => {
      state.pageInfo = initialState.pageInfo
    }
  },
});

export const { selectPageInfo, refreshPageInfo } = pageSlice.actions;

export const selectPage = (state: RootState) => state.page.pageInfo;

export default pageSlice.reducer;