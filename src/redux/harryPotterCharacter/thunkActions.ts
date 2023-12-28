import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { showErrorNotification } from '../notifications/actions';
import { StarWarsType } from '../../types/starWarsTypes';
import { HarryPotterType } from '../../types/harryPotterTypes';

export const fetchHarryPotterCharacterData = createAsyncThunk(
  'harryPotter/fetchHarryPotterCharacterData',
  async (page: string | undefined, thunkApi) => {
    try {
      const response = await axios.get(`https://hp-api.onrender.com/api/character/${page}`);
      const results = response?.data as HarryPotterType[];
      return { results };
    } catch (apiError) {
      if (apiError instanceof Error) {
        thunkApi.dispatch(showErrorNotification('Fetch Harry Potter error notification', apiError.message));
        return thunkApi.rejectWithValue(apiError);
      }
    }
  }
);
