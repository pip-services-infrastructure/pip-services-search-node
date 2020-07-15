// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { ConfigParams } from 'pip-services3-commons-node';
// import { IConfigurable } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { IReferences } from 'pip-services3-commons-node';
// import { IReferenceable } from 'pip-services3-commons-node';
// import { CommandSet } from 'pip-services3-commons-node';
// import { ICommandable } from 'pip-services3-commons-node';

// import { SearchRecordV1 } from '../data/version1/SearchRecordV1';
// import { ISearchPersistence } from '../../src/persistence/ISearchPersistence';
// import { ISearchController } from './ISearchController';
// import { SearchCommandSet } from './SearchCommandSet';

// export class SearchController implements ISearchController, IConfigurable, IReferenceable, ICommandable {
//     private _persistence: ISearchPersistence;
//     private _commandSet: SearchCommandSet;

//     public constructor() { }

//     public configure(config: ConfigParams): void {

//     }

//     public setReferences(references: IReferences): void {
//         this._persistence = references.getOneRequired<ISearchPersistence>(
//             new Descriptor('pip-services-search', 'persistence', '*', '*', '1.0')
//         );
//     }

//     public getCommandSet(): CommandSet {
//         if (this._commandSet == null) {
//             this._commandSet = new SearchCommandSet(this);
//         }

//         return this._commandSet;
//     }

//     public getRecords(correlationId: string, filter: FilterParams, paging: PagingParams,
//         callback: (err: any, page: DataPage<SearchRecordV1>) => void): void {
//         this._persistence.getPageByFilter(correlationId, filter, paging, callback);
//     }

//     public getRecordById(correlationId: string, recordId: string,
//         callback: (err: any, record: SearchRecordV1) => void): void {
//         this._persistence.getOneById(correlationId, recordId, callback);
//     }

//     public setRecord(correlationId: string, record: SearchRecordV1,
//         callback: (err: any, record: SearchRecordV1) => void): void {
//         this._persistence.create(correlationId, record, callback);
//     }

//     public updateRecord(correlationId: string, record: SearchRecordV1,
//         callback: (err: any, record: SearchRecordV1) => void): void {
//         this._persistence.update(correlationId, record, callback);
//     }

//     public deleteRecordById(correlationId: string, recordId: string,
//         callback: (err: any, record: SearchRecordV1) => void): void {
//         this._persistence.deleteById(correlationId, recordId, callback);
//     }

// }