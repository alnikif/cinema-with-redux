import { configureStore, AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import settingsReducer from './redux/settings/settingsReducer';

const rootReducer = {
    settings: settingsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;

