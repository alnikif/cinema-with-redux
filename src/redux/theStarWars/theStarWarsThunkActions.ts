import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { StarWarsType } from '../../types/starWarsTypes';
// import { TheStarWarsStateType } from './theStarWarsStateTypes';

export type RickAndMortyParamsType = {
  page: string;
};

export const fetchTheStarWarsList = createAsyncThunk('theStarWars/fetchTheStarWarsList', async () => {
  // const state = thunkApi.getState() as RootState;

  try {
    const response = await axios.get(`https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json`);
    const results = response?.data as StarWarsType[];
    console.log(response.data);
    return { results };
  } catch (apiError) {
    if (apiError instanceof Error) {
      // thunkApi.rejectWithValue(apiError);
    }
  }
});
