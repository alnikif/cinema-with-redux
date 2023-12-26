import { createSlice } from '@reduxjs/toolkit';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';
import { fetchRickAndMortyData } from './thunkActions';
import uniqBy from 'lodash/uniqBy';
import { RickAndMortyCharacterStateType } from './stateTypes';

const initialState: RickAndMortyCharacterStateType = {
  id: '',
  data: null,
  listStatus: ThunkLoadingStatusEnum.idle,
  listError: null
};

export const rickAndMortyCharacterSlice = createSlice({
  name: 'rickAndMortyCharacter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRickAndMortyData.pending, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = null;
    });
    builder.addCase(fetchRickAndMortyData.fulfilled, (state, action) => {
      const { data: prevList } = state;

      if (action.payload) {
        const { payload } = action;
        const { results } = payload;
        state.data = results;
        state.listStatus = action.meta.requestStatus;
        state.listError = null;
      }
    });
    builder.addCase(fetchRickAndMortyData.rejected, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = action.payload as Error;
    });
  }
});

export default rickAndMortyCharacterSlice.reducer;
