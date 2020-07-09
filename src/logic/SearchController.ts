// let async = require('async');

// import { ConfigParams } from 'pip-services3-commons-node';
// import { IConfigurable } from 'pip-services3-commons-node';
// import { IReferences } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { IReferenceable } from 'pip-services3-commons-node';
// import { DependencyResolver } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';
// import { ICommandable } from 'pip-services3-commons-node';
// import { CommandSet } from 'pip-services3-commons-node';
// import { BadRequestException } from 'pip-services3-commons-node';

// import { SearchV1 } from '../data/version1/SearchV1';
// import { SearchStateV1 } from '../data/version1/SearchStateV1';
// import { ISearchPersistence } from '../persistence/ISearchPersistence';
// import { ISearchController } from './ISearchController';
// import { SearchCommandSet } from './SearchCommandSet';
// import { UnauthorizedException } from 'pip-services3-commons-node/obj/src/errors/UnauthorizedException';

// export class SearchController implements  IConfigurable, IReferenceable, ICommandable, ISearchController {
//     private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
//         'dependencies.persistence', 'pip-services-search:persistence:*:*:1.0'
//     );

//     private _dependencyResolver: DependencyResolver = new DependencyResolver(SearchController._defaultConfig);
//     private _persistence: ISearchPersistence;
//     private _commandSet: SearchCommandSet;

//     public configure(config: ConfigParams): void {
//         this._dependencyResolver.configure(config);
//     }

//     public setReferences(references: IReferences): void {
//         this._dependencyResolver.setReferences(references);
//         this._persistence = this._dependencyResolver.getOneRequired<ISearchPersistence>('persistence');
//     }

//     public getCommandSet(): CommandSet {
//         if (this._commandSet == null)
//             this._commandSet = new SearchCommandSet(this);
//         return this._commandSet;
//     }
    
//     public getSearch(correlationId: string, filter: FilterParams, paging: PagingParams, 
//         callback: (err: any, page: DataPage<SearchV1>) => void): void {
//         this._persistence.getPageByFilter(correlationId, filter, paging, callback);
//     }

//     public getSearchById(correlationId: string, id: string, customerId: string,
//         callback: (err: any, search: SearchV1) => void): void {
//         this._persistence.getOneById(correlationId, id, (err, search) => {
//             // Do not allow to access search of different customer
//             if (search && search.customer_id != customerId)
//                 search = null;
            
//             callback(err, search);
//         });
//     }

//     public createSearch(correlationId: string, search: SearchV1, 
//         callback: (err: any, search: SearchV1) => void): void {

//         search.state = search.state || SearchStateV1.Ok;
//         search.create_time = new Date();
//         search.update_time = new Date();

//         this._persistence.create(correlationId, search, callback);
//     }

//     public updateSearch(correlationId: string, search: SearchV1, 
//         callback: (err: any, search: SearchV1) => void): void {

//         let newSearch: SearchV1;

//         search.state = search.state || SearchStateV1.Ok;
//         search.update_time = new Date();
    
//         async.series([
//             (callback) => {
//                 this._persistence.getOneById(correlationId, search.id, (err, data) => {
//                     if (err == null && data && data.customer_id != search.customer_id) {
//                         err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong Search customer id')
//                             .withDetails('id', search.id)
//                             .withDetails('customer_id', search.customer_id);
//                     }
//                     callback(err);
//                 });
//             },
//             (callback) => {
//                 this._persistence.update(correlationId, search, (err, data) => {
//                     newSearch = data;
//                     callback(err);
//                 });
//             }
//         ], (err) => {
//             callback(err, newSearch);
//         });
//     }

//     public deleteSearchById(correlationId: string, id: string, customerId: string,
//         callback: (err: any, search: SearchV1) => void): void {  

//         let oldSearch: SearchV1;

//         async.series([
//             (callback) => {
//                 this._persistence.getOneById(correlationId, id, (err, data) => {
//                     if (err == null && data && data.customer_id != customerId) {
//                         err = new BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong Search customer id')
//                             .withDetails('id', id)
//                             .withDetails('customer_id', customerId);
//                     }
//                     callback(err);
//                 });
//             },
//             (callback) => {
//                 this._persistence.deleteById(correlationId, id, (err, data) => {
//                     oldSearch = data;
//                     callback(err);
//                 });
//             }
//         ], (err) => {
//             if (callback) callback(err, oldSearch);
//         });
//     }

// }
