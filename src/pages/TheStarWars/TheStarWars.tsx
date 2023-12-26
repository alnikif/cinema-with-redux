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
import { DispatchType } from '../../store';
import { NotificationError } from '../../components/NotificationError/NotificationError';

export const TheStarWars = () => {
  const view = useSelector(selectView);
  const dispatch: DispatchType = useDispatch();
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
    onFetchTheStarWarsList();
  }, []);

  return (
    <div>
      {/*<NotificationError title="Fetch The Star Wars error notification" message={error?.message} />*/}
      <div className={styles.dropdownViewWrapper}>
        <Dropdown selectedOptionId={view} options={viewsOptions} onSelect={changeView} />
      </div>
      {view === PageViews.card && <StarWarsCards title="The Star Wars" data={results} />}
      {view === PageViews.table && <Table title="Star Wars" data={results} tableConfig={headerStarWarsRowConfig} />}
    </div>
  );
};
