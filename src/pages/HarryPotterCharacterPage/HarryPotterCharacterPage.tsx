import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { HarryPotterCharacter } from './HarryPotterCharacter/HarryPotterCharacter';
import { DispatchType } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchHarryPotterCharacterData } from '../../redux/harryPotterCharacter/thunkActions';
import {
  selectHarryPotterCharacterData,
  selectHarryPotterCharacterError,
  selectHarryPotterCharacterStatus,
  selectIsHarryPotterCharacterLoading
} from '../../redux/harryPotterCharacter/selectors';

export const HarryPotterCharacterPage = () => {
  const { characterId } = useParams();
  const dispatch: DispatchType = useDispatch();

  const harryPotterCharacterSelectors = createStructuredSelector({
    results: selectHarryPotterCharacterData,
    status: selectHarryPotterCharacterStatus,
    loading: selectIsHarryPotterCharacterLoading,
    error: selectHarryPotterCharacterError
  });

  const { results, status, loading, error } = useSelector(harryPotterCharacterSelectors);

  useEffect(() => {
    dispatch(fetchHarryPotterCharacterData(characterId));
  }, [characterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!results) {
    return <div>No data</div>;
  }
  return <div>{results && <HarryPotterCharacter characterData={results} />}</div>;
};
