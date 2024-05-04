import { configureStore, ThunkAction, ThunkDispatch, Action } from '@reduxjs/toolkit';
import settingsReducer from './redux/settings/settingsReducer';
import rickAndMortyReducer from './redux/rickAndMorty/rickAndMortyReducer';
import theStarWarsReducer from './redux/theStarWars/theStarWarsReducer';
import notificationsReducer from './redux/notifications/reducer';
import rickAndMortyCharacterReducer from './redux/rickAndMortyCharacter/reducer';
import theStarWarsCharacterReducer from './redux/theStarWarsCharacter/reducer';
import harryPotterReducer from './redux/harryPotter/reducer';
import harryPotterCharacterReducer from './redux/harryPotterCharacter/reducer';

const rootReducer = {
  settings: settingsReducer,
  rickAndMorty: rickAndMortyReducer,
  theStarWars: theStarWarsReducer,
  notifications: notificationsReducer,
  rickAndMortyCharacter: rickAndMortyCharacterReducer,
  theStarWarsCharacter: theStarWarsCharacterReducer,
  harryPotter: harryPotterReducer,
  harryPotterCharacter: harryPotterCharacterReducer
};

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type DispatchType = ThunkDispatch<RootState, unknown, Action>;
