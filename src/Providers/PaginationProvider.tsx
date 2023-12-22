import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

export enum PaginationTypes {
  infinity = 'infinity',
  manual = 'manual'
}

export const paginations = [
  { key: PaginationTypes.manual, title: 'Manual Pagination' },
  { key: PaginationTypes.infinity, title: 'Infinity Pagination' }
];

export const DEFAULT_PAGINATION = PaginationTypes.manual;

type ProvidersType = {
  readonly children: ReactNode;
};

export const PaginationProvider: FC<ProvidersType> = (props) => {
  const { children } = props;

  return <>{children}</>;
};
