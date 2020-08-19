let _ = require('lodash');

import { ISearchPersistence } from './ISearchPersistence';
import { FilterParams, IReferences, ConfigParams, ConfigException, IdGenerator } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IOpenable } from 'pip-services3-commons-node';
import { ICleanable } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { SearchRecordV1 } from '../data/version1';
import { HttpConnectionResolver } from 'pip-services3-rpc-node';

export class SearchElasticPersistence implements ISearchPersistence, IReferenceable, IConfigurable, IOpenable, ICleanable {
    private _connectionResolver: HttpConnectionResolver = new HttpConnectionResolver();

    private _index: string = 'search';
    private _type: string = 'search_records';
    private _reconnect: number = 60000;
    private _timeout: number = 30000;
    private _maxRetries: number = 3;

    private _client: any = null;

    /**
	 * Sets references to dependent components.
	 * 
	 * @param references 	references to locate the component dependencies. 
     */
    public setReferences(references: IReferences): void {
        this._connectionResolver.setReferences(references);
    }

    /**
     * Configures component by passing configuration parameters.
     * 
     * @param config    configuration parameters to be set.
     */
    public configure(config: ConfigParams): void {

        this._connectionResolver.configure(config);

        this._index = config.getAsStringWithDefault('index', this._index);
        this._type = config.getAsStringWithDefault('type', this._type);
        this._reconnect = config.getAsIntegerWithDefault('options.reconnect', this._reconnect);
        this._timeout = config.getAsIntegerWithDefault('options.timeout', this._timeout);
        this._maxRetries = config.getAsIntegerWithDefault('options.max_retries', this._maxRetries);
    }

    /**
	 * Checks if the component is opened.
	 * 
	 * @returns true if the component has been opened and false otherwise.
     */
    public isOpen(): boolean {
        return this._client != null;
    }

    /**
	 * Opens the component.
	 * 
	 * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    public open(correlationId: string, callback: (err: any) => void): void {
        if (this.isOpen()) {
            callback(null);
            return;
        }

        this._connectionResolver.resolve(correlationId, (err, connection) => {
            if (connection == null)
                err = new ConfigException(correlationId, 'NO_CONNECTION', 'Connection is not configured');

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

    private createIndexIfNeeded(correlationId: string, force: boolean, callback: (err: any) => void): void {
        this._client.indices.exists(
            { index: this._index },
            (err, exists) => {
                if (err || exists) {
                    callback(err);
                    return;
                }

                this._client.indices.create(
                    {
                        index: this._index,
                        body: {
                            settings: {
                                number_of_shards: 1
                            },
                            // mappings: {
                            //     properties: {
                            //         id: { type: 'text', index: true },
                            //         type: { type: 'keyword', index: true },
                            //         subtype: { type: 'keyword', index: true },
                            //         name: { type: 'text', index: true },
                            //         description: { type: 'text', index: true },
                            //         time: { type: 'date', index: true },
                            //         field1: { type: 'text', index: true },
                            //         field2: { type: 'text', index: true },
                            //         field3: { type: 'text', index: true },
                            //         tags: { type: 'text', index: true },
                            //         content: { type: 'text', index: true },
                            //         // refs: {
                            //         //     type: 'array',
                            //         //     properties: {
                            //         //         id: { type: 'text', index: false },
                            //         //         type: { type: 'keyword', index: false },
                            //         //         subtype: { type: 'keyword', index: false },
                            //         //         name: { type: 'text', index: false },
                            //         //         parent: { type: 'boolean', index: false },
                            //         //     }
                            //         // },
                            //     }
                            // }
                        }
                    },
                    (err) => {
                        // Skip already exist errors
                        if (err && err.message.indexOf('resource_already_exists') >= 0)
                            err = null;

                        callback(err);
                    }
                );
            }
        );
    }

    /**
	 * Closes component and frees used resources.
	 * 
	 * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    public close(correlationId: string, callback: (err: any) => void): void {
        this._client = null;

        if (callback) callback(null);
    }

    clear(correlationId: string, callback?: (err: any) => void): void {
        this._client.indices.exists(
            { index: this._index },
            (err, exists) => {
                if (err || !exists) {
                    callback(err);
                    return;
                }

                this._client.indices.delete({
                    index: this._index
                }, (err) => {
                    if (err) {
                        if (callback) callback(err);
                    }

                    this.createIndexIfNeeded(correlationId, true, (err) => {
                        if (callback) callback(err);
                    });
                });
            }
        );
    }

    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SearchRecordV1>) => void): void {
        let query = this.composeFilter(filter);
        var records = [];

        this._client.search({
            'index': this._index,
            'body': {
                'query': query,
            }
        }, function getMoreUntilDone(err, response, status) {
            response.hits.hits.forEach(function (hit) {
                records.push(hit);
            });

            if (response.hits.total.value !== records.length) {
                // now we can call scroll over and over
                this._client.scroll({
                    scrollId: response._scroll_id,
                    // scroll: '10s'
                }, getMoreUntilDone);
            } else {
                var page = new DataPage<SearchRecordV1>(records.map((value) => value['_source']));
                callback(null, page);
            }
        });
    }

    getOneById(correlationId: string, id: string, callback: (err: any, item: SearchRecordV1) => void): void {
        this._client.get({
            'index': this._index,
            'type': this._type,
            '_source': true,
            'id': id
        }, (err, response, status) => {
            if (err) callback(response.found == false ? null : err, null);
            else callback(null, response['_source']);
        });
    }

    create(correlationId: string, item: SearchRecordV1, callback: (err: any, item: SearchRecordV1) => void): void {
        item.id = item.id || IdGenerator.nextLong();

        this._client.create({
            'index': this._index,
            'type': this._type,
            'id': item.id,
            'body': item
        }, (err, response, status) => {
            if (err) callback(err, null);
            else callback(null, item);
        });
    }

    update(correlationId: string, item: SearchRecordV1, callback: (err: any, item: SearchRecordV1) => void): void {
        let doc = _.omit(item, 'id');

        this._client.update({
            'index': this._index,
            'type': this._type,
            'id': item.id,
            'body': { 'doc': doc }
        }, (err, response, status) => {
            if (err) callback(err, null);
            else callback(null, item);
        });
    }

    deleteById(correlationId: string, id: string, callback: (err: any, item: SearchRecordV1) => void): void {
        this.getOneById(correlationId, id, (err, item) => {
            if (err) {
                if (callback) callback(err, null);
                return;
            }

            this._client.delete({
                'index': this._index,
                'type': this._type,
                'id': id,
                'refresh': true
            }, (err, response, status) => {
                if (err) callback(err, null);
                else callback(null, item);
            });
        });
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            criteria.push({
                'multi_match': {
                    'query': search,
                    'fields': ['type', 'subtype', 'name', 'description', 'field1', 'field2', 'field3', 'content']
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

            if (fromTime) timeRange['gte'] = fromTime;
            if (toTime) timeRange['lt'] = toTime;

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
            criteria.push({ 'match': { 'content.keyword': content } });
        }

        return this.isEmpty(criteria) ? { 'match_all': {} } : { 'bool': { 'must': criteria } };
    }

    private isEmpty(obj): boolean {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    }
}