import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { StarWarsType } from '../../types/starWarsTypes';
import { TheStarWarsCharacter } from './TheStarWarsCharacter/TheStarWarsCharacter';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType } from '../../store';
import { fetchTheStarWarsData } from '../../redux/theStarWarsCharacter/thunkActions';
import { createStructuredSelector } from 'reselect';

import {
  selectTheStarWarsCharacterData,
  selectTheStarWarsCharacterError,
  selectTheStarWarsCharacterPending,
  selectTheStarWarsCharacterStatus
} from '../../redux/theStarWarsCharacter/selectors';

export const TheStarWarsCharacterPage = () => {
  const { characterId } = useParams();

  const theStarWarsCharacterSelectors = createStructuredSelector({
    results: selectTheStarWarsCharacterData,
    status: selectTheStarWarsCharacterStatus,
    loading: selectTheStarWarsCharacterPending,
    error: selectTheStarWarsCharacterError
  });

  const { results, status, loading, error } = useSelector(theStarWarsCharacterSelectors);

  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(fetchTheStarWarsData(characterId));
  }, [characterId]);

  return <div>{results && <TheStarWarsCharacter characterData={results} />}</div>;
};
