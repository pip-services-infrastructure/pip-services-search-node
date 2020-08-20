import { FilterParams } from 'pip-services3-commons-node';
import { SortParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { SearchRecordV1 } from '../data/version1/SearchRecordV1';
export interface ISearchController {
    getRecords(correlationId: string, filter: FilterParams, paging: PagingParams, sort: SortParams, callback: (err: any, page: DataPage<SearchRecordV1>) => void): void;
    getRecordById(correlationId: string, recordId: string, callback: (err: any, record: SearchRecordV1) => void): void;
    setRecord(correlationId: string, record: SearchRecordV1, callback: (err: any, record: SearchRecordV1) => void): void;
    updateRecord(correlationId: string, record: SearchRecordV1, callback: (err: any, record: SearchRecordV1) => void): void;
    deleteRecordById(correlationId: string, recordId: string, callback: (err: any, record: SearchRecordV1) => void): void;
}
