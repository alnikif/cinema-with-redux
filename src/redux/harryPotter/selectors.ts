import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ThunkLoadingStatusEnum } from '../reduxSupportingTypes';

export const selectHarryPotterState = (state: RootState) => state.harryPotter;

export const selectHarryPotterData = createSelector(selectHarryPotterState, (slice) => slice.list);
export const selectHarryPotterStatus = createSelector(selectHarryPotterState, (slice) => slice.listStatus);
export const selectHarryPotterError = createSelector(selectHarryPotterState, (slice) => slice.listError);
export const selectHarryPotterPending = createSelector(selectHarryPotterStatus, (status) => status === ThunkLoadingStatusEnum.pending);

export const selectIsHarryPotterLoading = createSelector(
  selectHarryPotterStatus,
  (status) => status === ThunkLoadingStatusEnum.idle || status === ThunkLoadingStatusEnum.pending
);
