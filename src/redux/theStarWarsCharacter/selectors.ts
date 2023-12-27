import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';

export const selectTheStarWarsCharacterState = (state: RootState) => state.theStarWarsCharacter;

export const selectTheStarWarsCharacterData = createSelector(selectTheStarWarsCharacterState, (slice) => slice.data);
export const selectTheStarWarsCharacterStatus = createSelector(selectTheStarWarsCharacterState, (slice) => slice.listStatus);
export const selectTheStarWarsCharacterError = createSelector(selectTheStarWarsCharacterState, (slice) => slice.listError);
export const selectTheStarWarsCharacterPending = createSelector(
  selectTheStarWarsCharacterStatus,
  (status) => status === ThunkLoadingStatusEnum.pending
);

export const selectIsTheSarWarsLoading = createSelector(
  selectTheStarWarsCharacterStatus,
  (status) => status === ThunkLoadingStatusEnum.idle || status === ThunkLoadingStatusEnum.pending
);
