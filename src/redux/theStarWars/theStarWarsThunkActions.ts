import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { StarWarsType } from '../../types/starWarsTypes';
import { showErrorNotification } from '../notifications/actions';

export const fetchTheStarWarsList = createAsyncThunk('theStarWars/fetchTheStarWarsList', async (_, thunkApi) => {
  try {
    const response = await axios.get(`https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json`);
    const results = response?.data as StarWarsType[];
    return { results };
  } catch (apiError) {
    if (apiError instanceof Error) {
      thunkApi.dispatch(showErrorNotification('Fetch The Star Wars error notification', apiError.message));
      return thunkApi.rejectWithValue(apiError);
    }
  }
});
