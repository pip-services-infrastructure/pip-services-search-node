"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SearchElasticPersistence {
    constructor() {
        this._connectionResolver = new pip_services3_rpc_node_1.HttpConnectionResolver();
        this._index = 'search';
        this._type = 'search_records';
        this._reconnect = 60000;
        this._timeout = 30000;
        this._maxRetries = 3;
        this._maxPageSize = 1000;
        this._client = null;
    }
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references) {
        this._connectionResolver.setReferences(references);
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        this._connectionResolver.configure(config);
        this._index = config.getAsStringWithDefault('index', this._index);
        this._type = config.getAsStringWithDefault('type', this._type);
        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
        this._maxRetries = config.getAsIntegerWithDefault('options.max_retries', this._maxRetries);
        this._maxPageSize = config.getAsIntegerWithDefault('options.max_page_size', this._maxPageSize);
    }
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen() {
        return this._client != null;
    }
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    open(correlationId, callback) {
        if (this.isOpen()) {
            callback(null);
            return;
        }
        this._connectionResolver.resolve(correlationId, (err, connection) => {
            if (connection == null)
                err = new pip_services3_commons_node_1.ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');
            if (err != null) {
                callback(err);
                return;
            }
            let uri = connection.getUri();
            let options = {
                host: uri,
                requestTimeout: this._timeout,
                deadTimeout: this._reconnect,
                maxRetries: this._maxRetries
            };
            let elasticsearch = require('elasticsearch');
            this._client = new elasticsearch.Client(options);
            this.createIndexIfNeeded(correlationId, true, (err) => {
                callback(err);
            });
        });
    }
    createIndexIfNeeded(correlationId, force, callback) {
        this._client.indices.exists({ index: this._index }, (err, exists) => {
            if (err || exists) {
                callback(err);
                return;
            }
            this._client.indices.create({
                index: this._index,
                body: {
                    settings: {
                        number_of_shards: 1
                    },
                }
            }, (err) => {
                // Skip already exist errors
                if (err && err.message.indexOf('resource_already_exists') >= 0)
                    err = null;
                callback(err);
            });
        });
    }
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    close(correlationId, callback) {
        this._client = null;
        if (callback)
            callback(null);
    }
    clear(correlationId, callback) {
        this._client.indices.exists({ index: this._index }, (err, exists) => {
            if (err || !exists) {
                callback(err);
                return;
            }
            this._client.indices.delete({
                index: this._index
            }, (err) => {
                if (err) {
                    if (callback)
                        callback(err);
                }
                this.createIndexIfNeeded(correlationId, true, (err) => {
                    if (callback)
                        callback(err);
                });
            });
        });
    }
    getPageByFilter(correlationId, filter, paging, sort, callback) {
        let bodyQuery = this.composeFilter(filter);
        let bodySort = this.composeSort(sort);
        var records = [];
        let getMoreUntilDone = function (err, response, status) {
            response.hits.hits.forEach(function (hit) {
                records.push(hit);
            });
            if (response.hits.total.value !== records.length) {
                // now we can call scroll over and over
                this._client.scroll({
                    scrollId: response._scroll_id,
                }, getMoreUntilDone);
            }
            else {
                paging = paging != null ? paging : new pip_services3_commons_node_2.PagingParams();
                let skip = paging.getSkip(-1);
                let take = paging.getTake(this._maxPageSize);
                let total = null;
                if (paging.total)
                    total = records.length;
                if (skip > 0) {
                    records = _.slice(records, skip);
                }
                records = _.take(records, take);
                let page = new pip_services3_commons_node_3.DataPage(records.map((value) => value['_source']), total);
                callback(null, page);
            }
        }.bind(this);
        this._client.search({
            'index': this._index,
            'body': {
                'query': bodyQuery,
                'sort': bodySort
            }
        }, getMoreUntilDone);
    }
    getOneById(correlationId, id, callback) {
        this._client.get({
            'index': this._index,
            'type': this._type,
            '_source': true,
            'id': id
        }, (err, response, status) => {
            if (err)
                callback(response.found == false ? null : err, null);
            else
                callback(null, response['_source']);
        });
    }
    create(correlationId, item, callback) {
        item.id = item.id || pip_services3_commons_node_1.IdGenerator.nextLong();
        this._client.create({
            'index': this._index,
            'type': this._type,
            'id': item.id,
            'body': item
        }, (err, response, status) => {
            if (err)
                callback(err, null);
            else
                callback(null, item);
        });
    }
    update(correlationId, item, callback) {
        let doc = _.omit(item, 'id');
        this._client.update({
            'index': this._index,
            'type': this._type,
            'id': item.id,
            'body': { 'doc': doc }
        }, (err, response, status) => {
            if (err)
                callback(err, null);
            else
                callback(null, item);
        });
    }
    deleteById(correlationId, id, callback) {
        this.getOneById(correlationId, id, (err, item) => {
            if (err) {
                if (callback)
                    callback(err, null);
                return;
            }
            this._client.delete({
                'index': this._index,
                'type': this._type,
                'id': id,
                'refresh': true
            }, (err, response, status) => {
                if (err)
                    callback(err, null);
                else
                    callback(null, item);
            });
        });
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            criteria.push({
                'multi_match': {
                    'query': search,
                    'fields': ['type', 'subtype', 'name', 'field1', 'field2', 'field3', 'content']
                }
            });
        }
        let id = filter.getAsNullableString('id');
        if (id != null) {
            criteria.push({ 'match': { 'id.keyword': id } });
        }
        let type = filter.getAsNullableString('type');
        if (type != null) {
            criteria.push({ 'match': { 'type.keyword': type } });
        }
        var subtype = filter.getAsNullableString('subtype');
        if (subtype != null) {
            criteria.push({ 'match': { 'subtype.keyword': subtype } });
        }
        var name = filter.getAsNullableString('name');
        if (name != null) {
            criteria.push({ 'match': { 'name.keyword': name } });
        }
        var description = filter.getAsNullableString('description');
        if (description != null) {
            criteria.push({ 'match': { 'description.keyword': description } });
        }
        var fromTime = filter.getAsNullableDateTime('from_time');
        var toTime = filter.getAsNullableDateTime('to_time');
        if (fromTime || toTime) {
            let timeRange = {};
            if (fromTime)
                timeRange['gte'] = fromTime;
            if (toTime)
                timeRange['lt'] = toTime;
            criteria.push({ 'range': { 'time': timeRange } });
        }
        var field1 = filter.getAsNullableString('field1');
        if (field1 != null) {
            criteria.push({ 'match': { 'field1.keyword': field1 } });
        }
        var field2 = filter.getAsNullableString('field2');
        if (field2 != null) {
            criteria.push({ 'match': { 'field2.keyword': field2 } });
        }
        var field3 = filter.getAsNullableString('field3');
        if (field3 != null) {
            criteria.push({ 'match': { 'field3.keyword': field3 } });
        }
        var tags = filter.getAsNullableArray('tags');
        if (tags != null) {
            tags.forEach(x => criteria.push({ 'term': { 'tags': x } }));
        }
        var content = filter.getAsNullableString('content');
        if (content != null) {
            criteria.push({ 'match': { 'content': content } });
        }
        return this.isEmpty(criteria) ? { 'match_all': {} } : { 'bool': { 'must': criteria } };
    }
    composeSort(sort) {
        sort = sort || new pip_services3_commons_node_1.SortParams();
        let sortMap = [];
        sort.forEach(sortField => {
            let name = sortField.name == 'time' ? 'time' : sortField.name + '.keyword';
            let condition = {};
            condition[name] = { 'order': sortField.ascending ? 'asc' : 'desc' };
            sortMap.push(condition);
        });
        return sortMap;
    }
    isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }
}
exports.SearchElasticPersistence = SearchElasticPersistence;
//# sourceMappingURL=SearchElasticPersistence.js.map