import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { StarWarsType } from '../../types/starWarsTypes';

export const fetchTheStarWarsList = createAsyncThunk('theStarWars/fetchTheStarWarsList', async (_, thunkApi) => {
  try {
    const response = await axios.get(`https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json`);
    const results = response?.data as StarWarsType[];
    return { results };
  } catch (apiError) {
    if (apiError instanceof Error) {
      return thunkApi.rejectWithValue(apiError);
    }
  }
});
