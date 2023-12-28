import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HarryPotterType } from '../../types/harryPotterTypes';
import { HarryPotterCards } from '../../components/Cards/HarryPotterCards/HarryPotterCards';
import { PageViews, views } from '../../Providers/ViewProvider';
import Dropdown from '../../components/Dropdown/Dropdown';
import { harryPotterTableConfig } from './harryPotterTableConfig';
import { Table } from '../../components/Table/Table';
import styles from './HarryPotter.module.scss';
import { NotificationError } from '../../components/NotificationError/NotificationError';
import { useDispatch, useSelector } from 'react-redux';
import { selectView } from '../../redux/settings/settingsSelectors';
import { setView } from '../../redux/settings/settingsReducer';
import { DispatchType } from '../../store';
import { createStructuredSelector } from 'reselect';
import {
  selectHarryPotterData,
  selectHarryPotterError,
  selectHarryPotterStatus,
  selectIsHarryPotterLoading
} from '../../redux/harryPotter/selectors';
import { fetchHarryPotterList } from '../../redux/harryPotter/thunkActions';

export const HarryPotter = () => {
  // const [harryPotterData, setHarryPotterData] = useState<HarryPotterType[] | []>([]);
  // const [error, setError] = useState<Error | null>(null);
  // const [loading, setLoading] = useState(false);

  const harryPotterSelectors = createStructuredSelector({
    results: selectHarryPotterData,
    status: selectHarryPotterStatus,
    loading: selectIsHarryPotterLoading,
    error: selectHarryPotterError
  });

  const { results, status, loading, error } = useSelector(harryPotterSelectors);

  const view = useSelector(selectView);
  const dispatch: DispatchType = useDispatch();
  const changeView = (selectedView: PageViews) => {
    dispatch(setView(selectedView));
  };

  const viewsOptions = views.map(({ key, title }) => ({
    id: key,
    label: title
  }));

  useEffect(() => {
    dispatch(fetchHarryPotterList());
  }, []);

  return (
    <>
      <div className={styles.dropdownViewWrapper}>
        <Dropdown selectedOptionId={view} options={viewsOptions} onSelect={changeView} />
      </div>
      {view === PageViews.table && <Table title="Harry Potter" data={results} tableConfig={harryPotterTableConfig} />}
      {view === PageViews.card && <HarryPotterCards data={results} title="Harry Potter" />}

      <NotificationError title="Fetch Harry Potter error notification" message={error?.message} />
      {loading && <div>Loading...</div>}
    </>
  );
};
