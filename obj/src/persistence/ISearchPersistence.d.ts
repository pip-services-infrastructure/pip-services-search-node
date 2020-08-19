import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { SearchRecordV1 } from '../data/version1/SearchRecordV1';
export interface ISearchPersistence {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SearchRecordV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: SearchRecordV1) => void): void;
    create(correlationId: string, item: SearchRecordV1, callback: (err: any, item: SearchRecordV1) => void): void;
    update(correlationId: string, item: SearchRecordV1, callback: (err: any, item: SearchRecordV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: SearchRecordV1) => void): void;
}
