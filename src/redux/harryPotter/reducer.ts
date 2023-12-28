import { createSlice } from '@reduxjs/toolkit';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';
import { fetchHarryPotterList } from './thunkActions';
import { HarryPotterStateType } from './stateTypes';

const initialState: HarryPotterStateType = {
  list: [],
  listStatus: ThunkLoadingStatusEnum.idle,
  listError: null
};

export const harryPotterSlice = createSlice({
  name: 'harryPotter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHarryPotterList.pending, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = null;
    });
    builder.addCase(fetchHarryPotterList.fulfilled, (state, action) => {
      const { list: prevList } = state;

      if (action.payload) {
        const { payload } = action;
        const { results } = payload;
        state.list = results;
        state.listStatus = action.meta.requestStatus;
        state.listError = null;
      }
    });
    builder.addCase(fetchHarryPotterList.rejected, (state, action) => {
      state.listStatus = action.meta.requestStatus;
      state.listError = action.payload as Error;
    });
  }
});

export default harryPotterSlice.reducer;
