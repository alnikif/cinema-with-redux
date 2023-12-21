import React, {useEffect, useState} from 'react';

import {Table} from '../../components/Table/Table';
import {PageViews, views} from '../../Providers/ViewProvider';
import {NotificationError} from '../../components/NotificationError/NotificationError';
import {RickAndMortyCards} from '../../components/Cards/RickAndMortyCards/RickAndMortyCards';
import {headerRickAndMortyRowConfig} from './rickAndMortyTableConfig';
import InfiniteLoader from '../../components/InfiniteLoader/InfiniteLoader';
import usePagination from '../../hooks/usePagination';
import Dropdown from '../../components/Dropdown/Dropdown';
import {Pagination} from '../../components/Pagination/Pagination';
import styles from './RickAndMorty.module.scss';
import {paginations, PaginationTypes} from "../../Providers/PaginationProvider";
import {useDispatch, useSelector} from "react-redux";
import {selectPagination, selectView} from "../../redux/settings/settingsSelectors";
import {setPagination, setView} from "../../redux/settings/settingsReducer";
import {
    selectIsRickAndMortyLoading,
    selectRickAndMortyError,
    selectRickAndMortyList,
    selectRickAndMortyMeta,
    selectRickAndMortyStatus,
} from "../../redux/RickAndMorty/rickAndMortySelectors";
import {fetchRickAndMortyList, RickAndMortyParamsType} from "../../redux/RickAndMorty/rickAndMortyThunkActions";
import {DispatchType} from "../../store";
import {ThunkLoadingStatusEnum} from "../../redux/reduxSupportingTypes";


export const RickAndMorty = () => {
    const view = useSelector(selectView);
    const pagination = useSelector(selectPagination);
    const isInfinityPagination = useSelector(selectPagination);

    const results = useSelector(selectRickAndMortyList);
    const meta = useSelector(selectRickAndMortyMeta);
    const status = useSelector(selectRickAndMortyStatus);
    const loading = useSelector(selectIsRickAndMortyLoading);
    const error = useSelector(selectRickAndMortyError) as Error | null;

    const dispatch: DispatchType = useDispatch();

    const [pageRef, setPageRef] = useState<HTMLDivElement | null>(null);

    const hasNextPage = !!meta.next;

    const onChangeView = (selectedView: PageViews) => dispatch(setView(selectedView));
    const onFetchRickAndMortyList = (requestParams: RickAndMortyParamsType) => {
        dispatch(fetchRickAndMortyList(requestParams));
    }

    const viewsOptions = views.map(({ key, title }) => ({
        id: key,
        label: title
    }));

    const changePagination = (selectedPagination: PaginationTypes) => {
        dispatch(setPagination(selectedPagination))
    }

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
        onFetchRickAndMortyList(params);
    }, [isInfinityPagination, params.page]);

    useEffect(() => {
        if (!isInfinityPagination && status === ThunkLoadingStatusEnum.fulfilled) {
            pageRef?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
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
    }

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
                <Pagination
                    loading={loading}
                    pagesLength={meta.pages || 0}
                    currentPage={Number(params.page)}
                    onSelectPage={onSelectPage}
                />
            )}

            <NotificationError title="Fetch Rick and Morty error notification" message={error?.message} />

            {loading && <div>Loading...</div>}
        </div>
    );
};