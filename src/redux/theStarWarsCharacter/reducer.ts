import { createSlice } from '@reduxjs/toolkit';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';
import { fetchTheStarWarsData } from './thunkActions';
import { TheStarWarsCharacterStateType } from './stateTypes';

const initialState: TheStarWarsCharacterStateType = {
  id: '',
  data: null,
  listStatus: ThunkLoadingStatusEnum.idle,
  listError: null
};

export const TheStarWarsCharacterSlice = createSlice({
  name: 'theStarWarsCharacter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTheStarWarsData.pending, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = null;
    });
    builder.addCase(fetchTheStarWarsData.fulfilled, (state, action) => {
      const { data: prevList } = state;

      if (action.payload) {
        const { payload } = action;
        const { results } = payload;
        state.data = results;
        state.listStatus = action.meta.requestStatus;
        state.listError = null;
      }
    });
    builder.addCase(fetchTheStarWarsData.rejected, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = action.payload as Error;
    });
  }
});

export default TheStarWarsCharacterSlice.reducer;
