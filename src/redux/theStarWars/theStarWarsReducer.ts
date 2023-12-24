import { createSlice } from '@reduxjs/toolkit';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';
import { TheStarWarsStateType } from './theStarWarsStateTypes';
import { fetchTheStarWarsList } from './theStarWarsThunkActions';

const initialState: TheStarWarsStateType = {
  list: [],
  listStatus: ThunkLoadingStatusEnum.idle,
  listError: null
};

export const theStarWarsSlice = createSlice({
  name: 'theStarWars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTheStarWarsList.pending, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = null;
    });
    builder.addCase(fetchTheStarWarsList.fulfilled, (state, action) => {
      const { list: prevList } = state;

      if (action.payload) {
        const { results } = action.payload;
        state.list = results;
        state.listError = null;
        console.log(results);
      }
    });
    builder.addCase(fetchTheStarWarsList.rejected, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = action.payload as Error;
    });
  }
});

export default theStarWarsSlice.reducer;
