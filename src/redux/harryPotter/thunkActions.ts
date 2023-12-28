import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { showErrorNotification } from '../notifications/actions';
import { StarWarsType } from '../../types/starWarsTypes';
import { HarryPotterType } from '../../types/harryPotterTypes';

export const fetchHarryPotterList = createAsyncThunk('harryPotter/fetchHarryPotterList', async (_, thunkApi) => {
  try {
    const response = await axios.get('https://hp-api.onrender.com/api/characters');
    const results = response?.data as HarryPotterType[];
    return { results };
  } catch (apiError) {
    if (apiError instanceof Error) {
      thunkApi.dispatch(showErrorNotification('Fetch The Star Wars error notification', apiError.message));
      return thunkApi.rejectWithValue(apiError);
    }
  }
});
