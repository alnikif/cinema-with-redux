import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { RickAndMortyType } from '../../types/rickAndMortyTypes';
import { showErrorNotification } from '../notifications/actions';

export type RickAndMortyParamsType = {
  page: string;
};

export const fetchRickAndMortyData = createAsyncThunk('rickAndMortyCharacter/fetchRickAndMortyData', async (page: string | undefined, thunkApi) => {
  const state = thunkApi.getState() as RootState;

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${page}`);
    const results = response?.data as RickAndMortyType;
    return { results };
  } catch (apiError) {
    if (apiError instanceof Error) {
      thunkApi.dispatch(showErrorNotification('Fetch Rick and Morty error notification', apiError.message));
      return thunkApi.rejectWithValue(apiError);
    }
  }
});
