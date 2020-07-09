import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';

import { SearchV1 } from '../data/version1/SearchV1';
import { RatingV1 } from '../data/version1/RatingV1';

export interface ISearchPersistence extends IGetter<SearchV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<SearchV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: SearchV1) => void): void;

    set(correlationId: string, item: SearchV1, 
        callback: (err: any, rating: RatingV1) => void): void;

    increment(correlationId: string, rating: RatingV1, 
        callback: (err: any, rating: RatingV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: SearchV1) => void): void;
}
