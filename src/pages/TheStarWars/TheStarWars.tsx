import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { StarWarsType } from '../../types/starWarsTypes';
import { Table } from '../../components/Table/Table';
import { headerStarWarsRowConfig } from './starWarsTableConfig';
import { StarWarsCards } from '../../components/Cards/StarWarsCards/StarWarsCards';
import { PageViews, views } from '../../Providers/ViewProvider';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from './TheStarWars.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectView } from '../../redux/settings/settingsSelectors';
import { setView } from '../../redux/settings/settingsReducer';
import { fetchTheStarWarsList } from '../../redux/theStarWars/theStarWarsThunkActions';
import { createStructuredSelector } from 'reselect';
import {
  selectIsTheStarWarsLoading,
  selectTheStarWarsError,
  selectTheStarWarsList,
  selectTheStarWarsStatus
} from '../../redux/theStarWars/theStarWarsSelectors';

export const TheStarWars = () => {
  // const [starWarsData, setStarWarsData] = useState<StarWarsType[]>([]);

  const view = useSelector(selectView);
  const dispatch = useDispatch();
  const changeView = (selectedView: PageViews) => {
    dispatch(setView(selectedView));
  };

  const theStarWarsSelectors = createStructuredSelector({
    results: selectTheStarWarsList,
    status: selectTheStarWarsStatus,
    loading: selectIsTheStarWarsLoading,
    error: selectTheStarWarsError
  });

  const { results, status, loading, error } = useSelector(theStarWarsSelectors);

  const onFetchTheStarWarsList = () => {
    dispatch(fetchTheStarWarsList());
  };
  const viewsOptions = views.map(({ key, title }) => ({
    id: key,
    label: title
  }));

  useEffect(() => {
    // axios
    //   .get('https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json')
    //   .then((response) => {
    //     const listCharacters = response?.data || [];
    //     setStarWarsData(listCharacters);
    //   })
    //   .catch((apiError: unknown) => {
    //     if (apiError instanceof Error) {
    //     }
    //   })
    //   .finally(() => {
    //     //
    //   });
    onFetchTheStarWarsList();
  }, []);

  return (
    <div>
      <div className={styles.dropdownViewWrapper}>
        <Dropdown selectedOptionId={view} options={viewsOptions} onSelect={changeView} />
      </div>
      {view === PageViews.card && <StarWarsCards title="The Star Wars" data={results} />}
      {view === PageViews.table && <Table title="Star Wars" data={results} tableConfig={headerStarWarsRowConfig} />}
    </div>
  );
};
