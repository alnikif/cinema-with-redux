import { configureStore, AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import settingsReducer from './redux/settings/settingsReducer';
import rickAndMortyReducer from "./redux/RickAndMorty/rickAndMortyReducer";

const rootReducer = {
    settings: settingsReducer,
    rickAndMorty: rickAndMortyReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;