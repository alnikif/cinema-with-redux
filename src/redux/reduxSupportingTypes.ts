export enum ThunkLoadingStatusEnum {
  idle = 'idle',
  pending = 'pending',
  rejected = 'rejected',
  fulfilled = 'fulfilled'
}

export type ThunkLoadingStatusType = `${ThunkLoadingStatusEnum}`;
