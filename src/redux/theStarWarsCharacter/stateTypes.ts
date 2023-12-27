import { ThunkLoadingStatusType } from '../reduxSupportingTypes';
import { StarWarsType } from '../../types/starWarsTypes';

export type TheStarWarsCharacterStateType = {
  data: StarWarsType | null;
  id: string | undefined;
  listStatus: ThunkLoadingStatusType;
  listError: Error | null;
};
