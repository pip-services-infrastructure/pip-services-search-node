"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class SearchMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let subtype = filter.getAsNullableString('subtype');
        let name = filter.getAsNullableString('name');
        let description = filter.getAsNullableString('description');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        let field1 = filter.getAsNullableString('field1');
        let field2 = filter.getAsNullableString('field2');
        let field3 = filter.getAsNullableString('field3');
        let tags = filter.getAsNullableArray('tags');
        let content = filter.getAsNullableString('content');
        let search = filter.getAsNullableString('search');
        return (item) => {
            if (search != null && !this.matchSearch(item, search))
                return false;
            if (id != null && item.id != id)
                return false;
            if (type != null && item.type != type)
                return false;
            if (subtype != null && item.subtype != subtype)
                return false;
            if (name != null && item.name != name)
                return false;
            if (description != null && item.description != description)
                return false;
            if (fromTime != null && item.time < fromTime)
                return false;
            if (toTime != null && item.time > toTime)
                return false;
            if (field1 != null && item.field1 != field1)
                return false;
            if (field2 != null && item.field2 != field2)
                return false;
            if (field3 != null && item.field3 != field3)
                return false;
            if (content != null && item.content != content)
                return false;
            if (tags != null && item.tags != null && _.intersection(tags, item.tags).length != item.tags.length)
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.type, search))
            return true;
        if (this.matchString(item.subtype, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.description, search))
            return true;
        if (this.matchString(item.field1, search))
            return true;
        if (this.matchString(item.field2, search))
            return true;
        if (this.matchString(item.field3, search))
            return true;
        if (this.matchString(item.content, search))
            return true;
        return false;
    }
}
exports.SearchMemoryPersistence = SearchMemoryPersistence;
//# sourceMappingURL=SearchMemoryPersistence.js.map