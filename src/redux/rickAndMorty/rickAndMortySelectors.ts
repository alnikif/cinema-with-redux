import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';

export const selectRickAndMortyState = (state: RootState) => state.rickAndMorty;

export const selectRickAndMortyList = createSelector(selectRickAndMortyState, (slice) => slice.list);
export const selectRickAndMortyMeta = createSelector(selectRickAndMortyState, (slice) => slice.listMeta);
export const selectRickAndMortyStatus = createSelector(selectRickAndMortyState, (slice) => slice.listStatus);
export const selectRickAndMortyError = createSelector(selectRickAndMortyState, (slice) => slice.listError);

export const selectIsRickAndMortyPending = createSelector(selectRickAndMortyStatus, (status) => status === ThunkLoadingStatusEnum.pending);

export const selectIsRickAndMortyLoading = createSelector(
  selectRickAndMortyStatus,
  (status) => status === ThunkLoadingStatusEnum.idle || status === ThunkLoadingStatusEnum.pending
);
