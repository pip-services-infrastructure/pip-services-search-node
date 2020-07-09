import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { SortParams } from 'pip-services3-commons-node';

import { SearchV1 } from '../data/version1/SearchV1';
import { RatingV1 } from '../data/version1/RatingV1';

export interface ISearchController {
    getSearch(correlationId: string, filter: FilterParams, paging: PagingParams, sorting: SortParams,
        callback: (err: any, page: DataPage<SearchV1>) => void): void;

    getSearchById(correlationId: string, search_id: string,
        callback: (err: any, search: SearchV1) => void): void;

    getPartySearch(correlationId: string, party_id: string, product_id: string,
        callback: (err: any, search: SearchV1) => void): void;

    getProductRating(correlationId: string, product_id: string,
        callback: (err: any, rating: RatingV1) => void): void;
        
    submitSearch(correlationId: string, search: SearchV1, 
        callback: (err: any, rating: RatingV1) => void): void;

    reportHelpful(correlationId: string, search_id: string, party_id: string,
        callback: (err: any, search: SearchV1) => void): void;

    reportAbuse(correlationId: string, search_id: string, party_id: string,
        callback: (err: any, search: SearchV1) => void): void;
            
    deleteSearchById(correlationId: string, search_id: string,
        callback: (err: any, rating: RatingV1) => void): void;
}
