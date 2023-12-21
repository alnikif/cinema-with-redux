import {ThunkLoadingStatusType} from "../reduxSupportingTypes";
import {RickAndMortyType} from "../../types/rickAndMortyTypes";

export type RickAndMortyResponseMetaType = {
    count: number;
    next: string | null;
    pages: number | null;
    prev: unknown | null | string;
};

export type RickAndMortyResponseType = {
    meta: RickAndMortyResponseMetaType;
    results: RickAndMortyType[];
};

export type RickAndMortyStateType = {
    list: RickAndMortyType[];
    listMeta: RickAndMortyResponseMetaType;
    listStatus: ThunkLoadingStatusType;
    listError: unknown | null;
};