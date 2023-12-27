import { configureStore, AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import settingsReducer from './redux/settings/settingsReducer';
import rickAndMortyReducer from './redux/rickAndMorty/rickAndMortyReducer';
import theStarWarsReducer from './redux/theStarWars/theStarWarsReducer';
import notificationsReducer from './redux/notifications/reducer';
import rickAndMortyCharacterReducer from './redux/rickAndMortyCharacter/reducer';
import theStarWarsCharacterReducer from './redux/theStarWarsCharacter/reducer';

const rootReducer = {
  settings: settingsReducer,
  rickAndMorty: rickAndMortyReducer,
  theStarWars: theStarWarsReducer,
  notifications: notificationsReducer,
  rickAndMortyCharacter: rickAndMortyCharacterReducer,
  theStarWarsCharacter: theStarWarsCharacterReducer
};

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;
