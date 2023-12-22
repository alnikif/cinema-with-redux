import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';
import { PaginationTypes } from '../../Providers/PaginationProvider';

export const selectSettings = (state: RootState) => state.settings;
export const selectTheme = (state: RootState) => selectSettings(state).theme;
export const selectView = (state: RootState) => selectSettings(state).view;

export const selectPagination = (state: RootState) => selectSettings(state).pagination;
export const selectIsInfinityPagination = createSelector(selectPagination, (pagination) => pagination === PaginationTypes.infinity);
