import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';

export const selectRickAndMortyCharacterState = (state: RootState) => state.rickAndMortyCharacter;

export const selectRickAndMortyData = createSelector(selectRickAndMortyCharacterState, (slice) => slice.data);
export const selectRickAndMortyCharacterStatus = createSelector(selectRickAndMortyCharacterState, (slice) => slice.listStatus);
export const selectRickAndMortyCharacterError = createSelector(selectRickAndMortyCharacterState, (slice) => slice.listError);
export const selectIsRickAndMortyCharacterPending = createSelector(
  selectRickAndMortyCharacterStatus,
  (status) => status === ThunkLoadingStatusEnum.pending
);

export const selectIsRickAndMortyLoading = createSelector(
  selectRickAndMortyCharacterStatus,
  (status) => status === ThunkLoadingStatusEnum.idle || status === ThunkLoadingStatusEnum.pending
);
