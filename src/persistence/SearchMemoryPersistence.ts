// let _ = require('lodash');

// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { DataPage } from 'pip-services3-commons-node';

// import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

// import { SearchRecordV1 } from '../data/version1/SearchRecordV1';
// import { ISearchPersistence } from './ISearchPersistence';

// export class SearchMemoryPersistence
//   extends IdentifiableMemoryPersistence<SearchRecordV1, string>
//   implements ISearchPersistence {

//   constructor() {
//     super();

//     this._maxPageSize = 1000;
//   }

//   private composeFilter(filter: FilterParams): any {
//     filter = filter || new FilterParams();

//     let id = filter.getAsNullableString('id');
//     let bankName = filter.getAsNullableString('bank_name');
//     let routingNum = filter.getAsNullableString('routing_num');
//     let accountNum = filter.getAsNullableString('account_num');
//     let fromRegTime = filter.getAsNullableDateTime('from_register_time');
//     let toRegTime = filter.getAsNullableDateTime('to_register_time');

//     return (item) => {
//       if (id != null && item.id != id)
//         return false;
//       if (bankName != null && item.bank_name != bankName)
//         return false;
//       if (routingNum != null && item.routing_num != routingNum)
//         return false;
//       if (accountNum != null && item.account_num != accountNum)
//         return false;
//       if (fromRegTime != null && item.register_time >= fromRegTime)
//         return false;
//       if (toRegTime != null && item.register_time < toRegTime)
//         return false;
//       return true;
//     };
//   }

//   public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
//     callback: (err: any, page: DataPage<SearchRecordV1>) => void): void {
//     super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
//   }
// }