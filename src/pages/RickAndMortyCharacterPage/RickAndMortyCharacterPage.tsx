import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RickAndMortyCard } from '../../components/Cards/RickAndMortyCards/Card/RickAndMortyCard';
import { RickAndMortyType } from '../../types/rickAndMortyTypes';
import { DispatchType } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styles from './RickAndMortyCharacterPage.module.scss';

import {
  selectIsRickAndMortyCharacterPending,
  selectRickAndMortyCharacterError,
  selectRickAndMortyCharacterStatus,
  selectRickAndMortyData
} from '../../redux/rickAndMortyCharacter/selectors';
import { fetchRickAndMortyData } from '../../redux/rickAndMortyCharacter/thunkActions';

export const RickAndMortyCharacterPage = () => {
  const { characterId } = useParams();
  const dispatch: DispatchType = useDispatch();

  const rickAndMortyCharacterSelectors = createStructuredSelector({
    results: selectRickAndMortyData,
    status: selectRickAndMortyCharacterStatus,
    loading: selectIsRickAndMortyCharacterPending,
    error: selectRickAndMortyCharacterError
  });

  const { results, status, loading, error } = useSelector(rickAndMortyCharacterSelectors);

  useEffect(() => {
    dispatch(fetchRickAndMortyData(characterId));
  }, [characterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!results) {
    return <div>No data</div>;
  }

  return <div className={styles.characterWrapper}>{results && <RickAndMortyCard characterData={results} />}</div>;
};
