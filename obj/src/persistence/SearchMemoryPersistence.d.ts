import { FilterParams, SortParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { SearchRecordV1 } from '../data/version1/SearchRecordV1';
import { ISearchPersistence } from './ISearchPersistence';
export declare class SearchMemoryPersistence extends IdentifiableMemoryPersistence<SearchRecordV1, string> implements ISearchPersistence {
    constructor();
    private composeFilter;
    private composeSort;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, sort: SortParams, callback: (err: any, page: DataPage<SearchRecordV1>) => void): void;
    private matchString;
    private matchSearch;
}
