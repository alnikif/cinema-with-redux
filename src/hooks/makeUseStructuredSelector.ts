import { createStructuredSelector, Selector } from 'reselect';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type SelectorsType<T> = {
  [K in keyof T]: Selector<RootState, T[K]>;
};

export const makeUseStructuredSelector =
  <T extends Record<string, unknown>>(selectors: SelectorsType<T>) =>
  () => {
    // @ts-ignore
    const selector = useRef(createStructuredSelector<RootState, T>(selectors)).current;

    return useSelector(selector);
  };
