import { createSlice } from '@reduxjs/toolkit';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';
import { HarryPotterCharacterStateType } from './stateTypes';
import { fetchHarryPotterCharacterData } from './thunkActions';

const initialState: HarryPotterCharacterStateType = {
  page: '',
  data: null,
  listStatus: ThunkLoadingStatusEnum.idle,
  listError: null
};

export const harryPotterCharacterSlice = createSlice({
  name: 'harryPotter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHarryPotterCharacterData.pending, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = null;
    });
    builder.addCase(fetchHarryPotterCharacterData.fulfilled, (state, action) => {
      const { data: prevList } = state;

      if (action.payload) {
        const { payload } = action;
        const { results } = payload;
        state.data = results;
        state.listStatus = action.meta.requestStatus;
        state.listError = null;
      }
    });
    builder.addCase(fetchHarryPotterCharacterData.rejected, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = action.payload as Error;
    });
  }
});

export default harryPotterCharacterSlice.reducer;
