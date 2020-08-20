"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const SearchRecordV1Schema_1 = require("../data/version1/SearchRecordV1Schema");
class SearchCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeGetSearchCommand());
        this.addCommand(this.makeGetRecordByIdCommand());
        this.addCommand(this.makeSetRecordCommand());
        this.addCommand(this.makeUpdateRecordCommand());
        this.addCommand(this.makeDeleteRecordByIdCommand());
    }
    makeGetSearchCommand() {
        return new pip_services3_commons_node_2.Command('get_records', new pip_services3_commons_node_3.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_4.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_5.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_1.FilterParams.fromValue(args.get('filter'));
            let paging = pip_services3_commons_node_1.PagingParams.fromValue(args.get('paging'));
            let sort = this.createSortParams(args.get('sort'));
            this._controller.getRecords(correlationId, filter, paging, sort, callback);
        });
    }
    createSortParams(array) {
        if (array == null)
            return null;
        let sort = new pip_services3_commons_node_1.SortParams();
        array.forEach(map => {
            if (map.hasOwnProperty('name') && map.hasOwnProperty('ascending')) {
                let sortField = new pip_services3_commons_node_1.SortField();
                sortField.name = pip_services3_commons_node_1.StringConverter.toNullableString(map['name']);
                sortField.ascending = pip_services3_commons_node_1.BooleanConverter.toBooleanWithDefault(map['ascending'], true);
                if (sortField.name)
                    sort.push(sortField);
            }
        });
        return sort;
    }
    makeGetRecordByIdCommand() {
        return new pip_services3_commons_node_2.Command('get_record_by_id', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('record_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let recordId = args.getAsString('record_id');
            this._controller.getRecordById(correlationId, recordId, callback);
        });
    }
    makeSetRecordCommand() {
        return new pip_services3_commons_node_2.Command('set_record', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('record', new SearchRecordV1Schema_1.SearchRecordV1Schema()), (correlationId, args, callback) => {
            let record = this.fixRecord(args.getAsObject('record'));
            this._controller.setRecord(correlationId, record, (err, record) => {
                callback(err, this.fixRecord(record));
            });
        });
    }
    makeUpdateRecordCommand() {
        return new pip_services3_commons_node_2.Command('update_record', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('record', new SearchRecordV1Schema_1.SearchRecordV1Schema()), (correlationId, args, callback) => {
            let record = this.fixRecord(args.getAsObject('record'));
            this._controller.updateRecord(correlationId, record, callback);
        });
    }
    makeDeleteRecordByIdCommand() {
        return new pip_services3_commons_node_2.Command('delete_record_by_id', new pip_services3_commons_node_3.ObjectSchema(true)
            .withRequiredProperty('record_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let recordId = args.getAsString('record_id');
            this._controller.deleteRecordById(correlationId, recordId, callback);
        });
    }
    fixRecord(record) {
        if (record == null)
            return null;
        record.time = pip_services3_commons_node_1.DateTimeConverter.toNullableDateTime(record.time);
        return record;
    }
}
exports.SearchCommandSet = SearchCommandSet;
//# sourceMappingURL=SearchCommandSet.js.map