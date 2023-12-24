import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';

export const selectTheStarWarsState = (state: RootState) => state.theStarWars;

export const selectTheStarWarsList = createSelector(selectTheStarWarsState, (slice) => slice.list);
export const selectTheStarWarsStatus = createSelector(selectTheStarWarsState, (slice) => slice.listStatus);
export const selectTheStarWarsError = createSelector(selectTheStarWarsState, (slice) => slice.listError);

export const selectIsTheStarWarsPending = createSelector(selectTheStarWarsStatus, (status) => status === ThunkLoadingStatusEnum.pending);

export const selectIsTheStarWarsLoading = createSelector(
  selectTheStarWarsStatus,
  (status) => status === ThunkLoadingStatusEnum.idle || status === ThunkLoadingStatusEnum.pending
);
