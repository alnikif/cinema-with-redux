import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {RickAndMortyResponseMetaType, RickAndMortyResponseType} from "./rickAndMortyStateTypes";
import {selectPagination} from "../settings/settingsSelectors";
import {RootState} from "../../store";
import {RickAndMortyType} from "../../types/rickAndMortyTypes";

export type RickAndMortyParamsType = {
    page: string
}

export const fetchRickAndMortyList = createAsyncThunk<
    (RickAndMortyResponseType & { isInfinityPagination: boolean }) | undefined,
    RickAndMortyParamsType
>(
    'rickAndMorty/fetchRickAndMortyList',
    async (params, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const isInfinityPagination = selectPagination(state);

        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${params.page}`);
            const meta = response?.data?.info as RickAndMortyResponseMetaType;
            const results = response?.data?.results as RickAndMortyType[];

            return { meta, results, isInfinityPagination };
        } catch (apiError) {
            if (apiError instanceof Error) {
                thunkApi.rejectWithValue(apiError);
            }


        }
    }
)