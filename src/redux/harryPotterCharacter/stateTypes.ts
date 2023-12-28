import { ThunkLoadingStatusType } from '../reduxSupportingTypes';
import { HarryPotterType } from '../../types/harryPotterTypes';

export type HarryPotterCharacterStateType = {
  page: string | undefined;
  data: HarryPotterType[] | null;
  listStatus: ThunkLoadingStatusType;
  listError: Error | null;
};
