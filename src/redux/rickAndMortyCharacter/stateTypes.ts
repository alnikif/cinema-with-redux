import { RickAndMortyType } from '../../types/rickAndMortyTypes';
import { ThunkLoadingStatusType } from '../reduxSupportingTypes';

export type RickAndMortyCharacterStateType = {
  data: RickAndMortyType | null;
  id: string | undefined;
  listStatus: ThunkLoadingStatusType;
  listError: Error | null;
};
