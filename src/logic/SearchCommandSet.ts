// import { CommandSet, FilterParams, PagingParams } from 'pip-services3-commons-node';
// import { ICommand } from 'pip-services3-commons-node';
// import { Command } from 'pip-services3-commons-node';
// import { ObjectSchema } from 'pip-services3-commons-node';
// import { FilterParamsSchema } from 'pip-services3-commons-node';
// import { PagingParamsSchema } from 'pip-services3-commons-node';
// import { TypeCode } from 'pip-services3-commons-node';
// import { Parameters } from 'pip-services3-commons-node';

// import { SearchRecordV1Schema } from '../data/version1/SearchRecordV1Schema';
// import { ISearchController } from '../../src/logic/ISearchController';

// export class SearchCommandSet extends CommandSet {
//     private _controller: ISearchController;

//     constructor(controller: ISearchController) {
//         super();

//         this._controller = controller;

//         this.addCommand(this.makeGetSearchCommand());
//         this.addCommand(this.makeGetRecordByIdCommand());
//         this.addCommand(this.makeSetRecordCommand());
//         this.addCommand(this.makeUpdateRecordCommand());
//         this.addCommand(this.makeDeleteRecordByIdCommand());
//     }

//     private makeGetSearchCommand(): ICommand {
//         return new Command(
//             'get_records',
//             new ObjectSchema(true)
//                 .withOptionalProperty('filter', new FilterParamsSchema())
//                 .withOptionalProperty('paging', new PagingParamsSchema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let filter = FilterParams.fromValue(args.get('filter'));
//                 let paging = PagingParams.fromValue(args.get('paging'));
//                 this._controller.getRecords(correlationId, filter, paging, callback);
//             }
//         );
//     }

//     private makeGetRecordByIdCommand(): ICommand {
//         return new Command(
//             'get_record_by_id',
//             new ObjectSchema(true)
//                 .withRequiredProperty('record_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let recordId = args.getAsString('record_id');
//                 this._controller.getRecordById(correlationId, recordId, callback);
//             }
//         );
//     }

//     private makeSetRecordCommand(): ICommand {
//         return new Command(
//             'set_record',
//             new ObjectSchema(true)
//                 .withRequiredProperty('record', new SearchRecordV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let record = args.getAsObject('record');
//                 this._controller.setRecord(correlationId, record, callback);
//             }
//         );
//     }   

//     private makeUpdateRecordCommand(): ICommand {
//         return new Command(
//             'update_record',
//             new ObjectSchema(true)
//                 .withRequiredProperty('record', new SearchRecordV1Schema()),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let record = args.getAsObject('record');
//                 this._controller.updateRecord(correlationId, record, callback);
//             }
//         );
//     }   
    
//     private makeDeleteRecordByIdCommand(): ICommand {
//         return new Command(
//             'delete_record_by_id',
//             new ObjectSchema(true)
//                 .withRequiredProperty('record_id', TypeCode.String),
//             (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
//                 let recordId = args.getAsString('record_id');
//                 this._controller.deleteRecordById(correlationId, recordId, callback);
//             }
//         );
//     }

// }