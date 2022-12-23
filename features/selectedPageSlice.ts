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

export const selectedPageSlice = createSlice({
  name: 'selectedPage',
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

export const { selectPageInfo, refreshPageInfo } = selectedPageSlice.actions;

export const selectedPage = (state: RootState) => state.selectedPage.pageInfo;

export default selectedPageSlice.reducer;