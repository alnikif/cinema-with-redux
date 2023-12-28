import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';

export const selectHarryPotterCharacterState = (state: RootState) => state.harryPotterCharacter;

export const selectHarryPotterCharacterData = createSelector(selectHarryPotterCharacterState, (slice) => slice.data);
export const selectHarryPotterCharacterStatus = createSelector(selectHarryPotterCharacterState, (slice) => slice.listStatus);
export const selectHarryPotterCharacterError = createSelector(selectHarryPotterCharacterState, (slice) => slice.listError);
export const selectHarryPotterCharacterPending = createSelector(
  selectHarryPotterCharacterStatus,
  (status) => status === ThunkLoadingStatusEnum.pending
);

export const selectIsHarryPotterCharacterLoading = createSelector(
  selectHarryPotterCharacterStatus,
  (status) => status === ThunkLoadingStatusEnum.idle || status === ThunkLoadingStatusEnum.pending
);
