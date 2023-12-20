import { RootState } from '../../store';

export const selectSettings = (state: RootState) => state.settings;
export const selectTheme = (state: RootState) => selectSettings(state).theme;
export const selectView = (state: RootState) => selectSettings(state).view;

export  const selectPagination = (state: RootState) => selectSettings(state).pagination;




