// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';

// import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

// import { SearchRecordV1 } from '../data/version1/SearchRecordV1';
// import { ISearchPersistence } from './ISearchPersistence';

// export class SearchMongoDbPersistence
//   extends IdentifiableMongoDbPersistence<SearchRecordV1, string>
//   implements ISearchPersistence {
//   constructor() {
//     super('search');
//     this._maxPageSize = 1000;
//   }

//   private composeFilter(filter: FilterParams): any {
//     filter = filter || new FilterParams();

//     let criteria = [];

//     let id = filter.getAsNullableString('id');
//     if (id != null)
//       criteria.push({ _id: id });

//     var bankName = filter.getAsNullableString('bank_name');
//     if (bankName != null) {
//       criteria.push({ bank_name: bankName });
//     }

//     var routingNum = filter.getAsNullableString('routing_num');
//     if (routingNum != null) {
//       criteria.push({ routing_num: routingNum });
//     }

//     var accountNum = filter.getAsNullableString('account_num');
//     if (accountNum != null) {
//       criteria.push({ account_num: accountNum });
//     }

//     var toTime = filter.getAsNullableDateTime('to_register_time');
//     if (toTime != null) {
//       criteria.push({
//         register_time: { $lt: toTime }
//       });
//     }

//     var fromTime = filter.getAsNullableDateTime('from_register_time');
//     if (fromTime != null) {
//       criteria.push({
//         register_time: { $gte: fromTime }
//       });
//     }

//     return criteria.length > 0 ? { $and: criteria } : null;
//   }

//   public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
//     callback: (err: any, page: DataPage<SearchRecordV1>) => void): void {
//     super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
//   }
// }