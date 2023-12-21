import { createSlice } from '@reduxjs/toolkit';
import {ThunkLoadingStatusEnum} from "../reduxSupportingTypes";
import {RickAndMortyStateType} from "./rickAndMortyStateTypes";
import {rickAndMortyInitialMeta} from "./rickAndMortyConstants";
import {fetchRickAndMortyList} from "./rickAndMortyThunkActions";
import uniqBy from "lodash/uniqBy";


const initialState: RickAndMortyStateType = {
    list: [],
    listMeta: rickAndMortyInitialMeta,
    listStatus: ThunkLoadingStatusEnum.idle,
    listError: null,
};

export const rickAndMortySlice = createSlice({
    name: 'rickAndMorty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRickAndMortyList.pending, (state, action) => {
            state.listStatus = action.meta.requestStatus;
            state.listError = null;
        });
        builder.addCase(fetchRickAndMortyList.fulfilled, (state, action) => {
            const { list: prevList } = state;

            if (action.payload) {
                const { meta, results, isInfinityPagination } = action.payload;

                const nextResults = isInfinityPagination
                    ? uniqBy([...prevList, ...results], 'id')
                    : results;

                state.list = nextResults;
                state.listMeta = meta;
                state.listStatus = action.meta.requestStatus;
                state.listError = null;
            }
        });
        builder.addCase(fetchRickAndMortyList.rejected, (state, action) => {
            state.listStatus = action.meta.requestStatus;
            state.listError = action.payload;
        });
    },
});

export default rickAndMortySlice.reducer;