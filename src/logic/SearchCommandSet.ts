// import { CommandSet } from 'pip-services3-commons-node';
// import { ICommand } from 'pip-services3-commons-node';
// import { Command } from 'pip-services3-commons-node';
// import { Schema } from 'pip-services3-commons-node';
// import { Parameters } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';
// import { ObjectSchema } from 'pip-services3-commons-node';
// import { TypeCode } from 'pip-services3-commons-node';
// import { FilterParamsSchema } from 'pip-services3-commons-node';
// import { PagingParamsSchema } from 'pip-services3-commons-node';

// import { SearchV1 } from '../data/version1/SearchV1';
// import { SearchV1Schema } from '../data/version1/SearchV1Schema';
// import { ISearchController } from './ISearchController';

// export class SearchCommandSet extends CommandSet {
//     private _logic: ISearchController;

//     constructor(logic: ISearchController) {
//         super();

//         this._logic = logic;

//         // Register commands to the database
// 		this.addCommand(this.makeGetSearchCommand());
// 		this.addCommand(this.makeGetSearchByIdCommand());
// 		this.addCommand(this.makeCreateSearchCommand());
// 		this.addCommand(this.makeUpdateSearchCommand());
// 		this.addCommand(this.makeDeleteSearchByIdCommand());
//     }

// 	private makeGetSearchCommand(): ICommand {
// 		return new Command(
// 			"get_search",
// 			new ObjectSchema(true)
// 				.withOptionalProperty('filter', new FilterParamsSchema())
// 				.withOptionalProperty('paging', new PagingParamsSchema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let filter = FilterParams.fromValue(args.get("filter"));
//                 let paging = PagingParams.fromValue(args.get("paging"));
//                 this._logic.getSearch(correlationId, filter, paging, callback);
//             }
// 		);
// 	}

// 	private makeGetSearchByIdCommand(): ICommand {
// 		return new Command(
// 			"get_search_by_id",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('search_id', TypeCode.String)
// 				.withRequiredProperty('customer_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let searchId = args.getAsString("search_id");
//                 let customerId = args.getAsString("customer_id");
//                 this._logic.getSearchById(correlationId, searchId, customerId, callback);
//             }
// 		);
// 	}

// 	private makeCreateSearchCommand(): ICommand {
// 		return new Command(
// 			"create_search",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('search', new SearchV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let search = args.get("search");
//                 this._logic.createSearch(correlationId, search, callback);
//             }
// 		);
// 	}

// 	private makeUpdateSearchCommand(): ICommand {
// 		return new Command(
// 			"update_search",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('search', new SearchV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let search = args.get("search");
//                 this._logic.updateSearch(correlationId, search, callback);
//             }
// 		);
// 	}
	
// 	private makeDeleteSearchByIdCommand(): ICommand {
// 		return new Command(
// 			"delete_search_by_id",
// 			new ObjectSchema(true)
// 				.withRequiredProperty('search_id', TypeCode.String)
// 				.withRequiredProperty('customer_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let searchId = args.getAsNullableString("search_id");
//                 let customerId = args.getAsString("customer_id");
//                 this._logic.deleteSearchById(correlationId, searchId, customerId, callback);
// 			}
// 		);
// 	}

// }