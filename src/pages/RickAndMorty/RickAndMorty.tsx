import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Dropdown from '../../components/Dropdown/Dropdown';
import usePagination from '../../hooks/usePagination';
import InfiniteLoader from '../../components/InfiniteLoader/InfiniteLoader';
import { Table } from '../../components/Table/Table';
import { Pagination } from '../../components/Pagination/Pagination';
import { PageViews, views } from '../../Providers/ViewProvider';
import { RickAndMortyCards } from '../../components/Cards/RickAndMortyCards/RickAndMortyCards';
import { setPagination, setView } from '../../redux/settings/settingsReducer';
import { headerRickAndMortyRowConfig } from './rickAndMortyTableConfig';
import { paginations, PaginationTypes } from '../../Providers/PaginationProvider';
import { selectIsInfinityPagination, selectPagination, selectView } from '../../redux/settings/settingsSelectors';
import {
  selectIsRickAndMortyLoading,
  selectRickAndMortyList,
  selectRickAndMortyMeta,
  selectRickAndMortyStatus
} from '../../redux/rickAndMorty/rickAndMortySelectors';
import { fetchRickAndMortyList, RickAndMortyParamsType } from '../../redux/rickAndMorty/rickAndMortyThunkActions';
import { ThunkLoadingStatusEnum } from '../../redux/reduxSupportingTypes';
import { DispatchType } from '../../store';
import styles from './RickAndMorty.module.scss';

const rickAndMortySelectors = createStructuredSelector({
  view: selectView,
  pagination: selectPagination,
  isInfinityPagination: selectIsInfinityPagination,
  results: selectRickAndMortyList,
  meta: selectRickAndMortyMeta,
  status: selectRickAndMortyStatus,
  loading: selectIsRickAndMortyLoading
});

export const RickAndMorty = () => {
  const { view, pagination, isInfinityPagination, results, meta, status, loading } = useSelector(rickAndMortySelectors);

  const dispatch: DispatchType = useDispatch();

  const [pageRef, setPageRef] = useState<HTMLDivElement | null>(null);

  const hasNextPage = !!meta.next;

  const onChangeView = (selectedView: PageViews) => dispatch(setView(selectedView));
  const onFetchRickAndMortyList = (requestParams: RickAndMortyParamsType) => {
    dispatch(fetchRickAndMortyList(requestParams));
  };

  const viewsOptions = views.map(({ key, title }) => ({
    id: key,
    label: title
  }));

  const changePagination = (selectedPagination: PaginationTypes) => {
    dispatch(setPagination(selectedPagination));
  };

  const paginationOptions = paginations.map(({ key, title }) => ({
    id: key,
    label: title
  }));

  const [params, setPage] = usePagination(
    (page) => ({
      page: String(page)
    }),
    []
  );

  useEffect(() => {
    setPage(1);
  }, [isInfinityPagination]);

  useEffect(() => {
    onFetchRickAndMortyList(params);
  }, [isInfinityPagination, params.page]);

  useEffect(() => {
    if (!isInfinityPagination && status === ThunkLoadingStatusEnum.fulfilled) {
      pageRef?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [isInfinityPagination, status]);

  const onRefresh = () => setPage(1);

  const onEndReached = () => {
    if (hasNextPage) {
      setPage(Number(params.page) + 1);
    }
  };

  const onSelectPage = (nextPage: number) => {
    if (!loading) setPage(nextPage);
  };

  return (
    <div ref={setPageRef}>
      <div className={styles.dropdownWrapper}>
        <div>
          <Dropdown selectedOptionId={view} options={viewsOptions} onSelect={onChangeView} />
        </div>
        <div>
          <Dropdown selectedOptionId={pagination} options={paginationOptions} onSelect={changePagination} />
        </div>
      </div>

      {view === PageViews.card && <RickAndMortyCards title="Rick and Morty" data={results} />}
      {view === PageViews.table && <Table title="Rick and Morty" data={results} tableConfig={headerRickAndMortyRowConfig} />}

      {pagination === PaginationTypes.infinity && !loading && <InfiniteLoader offset={150} onReached={onEndReached} />}
      {pagination === PaginationTypes.manual && (
        <Pagination loading={loading} pagesLength={meta.pages || 0} currentPage={Number(params.page)} onSelectPage={onSelectPage} />
      )}

      {loading && <div>Loading...</div>}
    </div>
  );
};
