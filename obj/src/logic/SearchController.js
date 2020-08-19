"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const SearchCommandSet_1 = require("./SearchCommandSet");
class SearchController {
    constructor() { }
    configure(config) {
    }
    setReferences(references) {
        this._persistence = references.getOneRequired(new pip_services3_commons_node_1.Descriptor('pip-services-search', 'persistence', '*', '*', '1.0'));
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new SearchCommandSet_1.SearchCommandSet(this);
        }
        return this._commandSet;
    }
    getRecords(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRecordById(correlationId, recordId, callback) {
        this._persistence.getOneById(correlationId, recordId, callback);
    }
    setRecord(correlationId, record, callback) {
        this._persistence.create(correlationId, record, callback);
    }
    updateRecord(correlationId, record, callback) {
        this._persistence.update(correlationId, record, callback);
    }
    deleteRecordById(correlationId, recordId, callback) {
        this._persistence.deleteById(correlationId, recordId, callback);
    }
}
exports.SearchController = SearchController;
//# sourceMappingURL=SearchController.js.map