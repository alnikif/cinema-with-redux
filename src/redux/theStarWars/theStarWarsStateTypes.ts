import { ThunkLoadingStatusType } from '../reduxSupportingTypes';
import { StarWarsType } from '../../types/starWarsTypes';

export type TheStarWarsStateType = {
  list: StarWarsType[];
  listStatus: ThunkLoadingStatusType;
  listError: Error | null;
};
