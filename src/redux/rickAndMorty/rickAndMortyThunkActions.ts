import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RickAndMortyResponseInfoType } from './rickAndMortyStateTypes';
import { selectIsInfinityPagination } from '../settings/settingsSelectors';
import { RootState } from '../../store';
import { RickAndMortyType } from '../../types/rickAndMortyTypes';

export type RickAndMortyParamsType = {
  page: string;
};

export const fetchRickAndMortyList = createAsyncThunk('rickAndMorty/fetchRickAndMortyList', async (params: RickAndMortyParamsType, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  const isInfinityPagination = selectIsInfinityPagination(state);

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${params.page}`);
    const info = response?.data?.info as RickAndMortyResponseInfoType;
    const results = response?.data?.results as RickAndMortyType[];

    return { info, results, isInfinityPagination };
  } catch (apiError) {
    if (apiError instanceof Error) {
      thunkApi.rejectWithValue(apiError);
    }
  }
});
