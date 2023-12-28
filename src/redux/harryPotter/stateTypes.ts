import { ThunkLoadingStatusType } from '../reduxSupportingTypes';
import { HarryPotterType } from '../../types/harryPotterTypes';

export type HarryPotterStateType = {
  list: HarryPotterType[];
  listStatus: ThunkLoadingStatusType;
  listError: Error | null;
};
