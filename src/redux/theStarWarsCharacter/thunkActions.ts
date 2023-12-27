import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { RickAndMortyType } from '../../types/rickAndMortyTypes';
import { showErrorNotification } from '../notifications/actions';
import { StarWarsType } from '../../types/starWarsTypes';

// export type RickAndMortyParamsType = {
//   page: string;
// };

export const fetchTheStarWarsData = createAsyncThunk('theStarWarsCharacter/fetchTheStarWarsData', async (page: string | undefined, thunkApi) => {
  const state = thunkApi.getState() as RootState;

  try {
    const response = await axios.get(`https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/id/${page}.json`);
    const results = response?.data as StarWarsType;
    return { results };
  } catch (apiError) {
    if (apiError instanceof Error) {
      thunkApi.dispatch(showErrorNotification('Fetch The Star Wars error notification', apiError.message));
      return thunkApi.rejectWithValue(apiError);
    }
  }
});
