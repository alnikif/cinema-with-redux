import { createSlice } from '@reduxjs/toolkit';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';
import { RickAndMortyStateType } from './rickAndMortyStateTypes';
import { rickAndMortyInitialMeta } from './rickAndMortyConstants';
import { fetchRickAndMortyList } from './rickAndMortyThunkActions';
import uniqBy from 'lodash/uniqBy';

const initialState: RickAndMortyStateType = {
  list: [],
  listMeta: rickAndMortyInitialMeta,
  listStatus: ThunkLoadingStatusEnum.idle,
  listError: null
};

export const rickAndMortySlice = createSlice({
  name: 'rickAndMorty',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRickAndMortyList.pending, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = null;
    });
    builder.addCase(fetchRickAndMortyList.fulfilled, (state, action) => {
      const { list: prevList } = state;

      if (action.payload) {
        const { meta, payload } = action;
        const { info, results, isInfinityPagination } = payload;
        const { page: currentPage } = meta.arg;

        const shouldResetData = Number(currentPage) === 1 || !isInfinityPagination;

        const nextResults = shouldResetData ? results : uniqBy([...prevList, ...results], 'id');

        state.list = nextResults;
        state.listMeta = info;
        state.listStatus = action.meta.requestStatus;
        state.listError = null;
      }
    });
    builder.addCase(fetchRickAndMortyList.rejected, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = action.payload as Error;
    });
  }
});

export default rickAndMortySlice.reducer;
