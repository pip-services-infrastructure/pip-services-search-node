import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { SearchRecordV1 } from '../data/version1/SearchRecordV1';
import { ISearchController } from './ISearchController';
export declare class SearchController implements ISearchController, IConfigurable, IReferenceable, ICommandable {
    private _persistence;
    private _commandSet;
    constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getRecords(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SearchRecordV1>) => void): void;
    getRecordById(correlationId: string, recordId: string, callback: (err: any, record: SearchRecordV1) => void): void;
    setRecord(correlationId: string, record: SearchRecordV1, callback: (err: any, record: SearchRecordV1) => void): void;
    updateRecord(correlationId: string, record: SearchRecordV1, callback: (err: any, record: SearchRecordV1) => void): void;
    deleteRecordById(correlationId: string, recordId: string, callback: (err: any, record: SearchRecordV1) => void): void;
}
