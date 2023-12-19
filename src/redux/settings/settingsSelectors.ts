import { RootState } from '../../store';

export const selectSettings = (state: RootState) => state.settings;
export const selectTheme = (state: RootState) => selectSettings(state).theme;


