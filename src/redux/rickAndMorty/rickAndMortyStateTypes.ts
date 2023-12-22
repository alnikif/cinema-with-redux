import { ThunkLoadingStatusType } from '../reduxSupportingTypes';
import { RickAndMortyType } from '../../types/rickAndMortyTypes';

export type RickAndMortyResponseInfoType = {
  count: number;
  next: string | null;
  pages: number | null;
  prev: unknown | null | string;
};

export type RickAndMortyStateType = {
  list: RickAndMortyType[];
  listMeta: RickAndMortyResponseInfoType;
  listStatus: ThunkLoadingStatusType;
  listError: Error | null;
};
