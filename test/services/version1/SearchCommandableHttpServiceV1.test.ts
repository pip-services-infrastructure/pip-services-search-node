let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { SearchRecordV1 } from '../../../src/data/version1/SearchRecordV1';
import { SearchMemoryPersistence } from '../../../src/persistence/SearchMemoryPersistence';
import { SearchController } from '../../../src/logic/SearchController';
import { SearchCommandableHttpServiceV1 } from '../../../src/services/version1/SearchCommandableHttpServiceV1';
import { TestModel } from '../../data/TestModel';

const RECORD1: SearchRecordV1 = TestModel.createSearchRecord1();
const RECORD2: SearchRecordV1 = TestModel.createSearchRecord2();

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SearchCommandableHttpServiceV1', () => {
    let persistence: SearchMemoryPersistence;
    let controller: SearchController;
    let service: SearchCommandableHttpServiceV1;
    let rest: any;

    setup((done) => {
        let url = "http://localhost:3000";
        rest = restify.createJsonClient({ url: url, version: '*' });

        persistence = new SearchMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new SearchController();
        controller.configure(new ConfigParams());

        service = new SearchCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('pip-services-search', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-search', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-search', 'service', 'http', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            service.open(null, done);
        });
    });

    teardown((done) => {
        service.close(null, (err) => {
            persistence.close(null, done);
        });
    });

    test('CRUD Operations', (done) => {
        let record1: SearchRecordV1;

        async.series([
            // Create the first record
            (callback) => {
                rest.post('/v1/search/set_record',
                    {
                        record: RECORD1
                    },
                    (err, req, res, record) => {
                        assert.isNull(err);

                        TestModel.assertEqualSearchRecord(record, RECORD1);
                        callback();
                    }
                );
            },
            // Create the second record
            (callback) => {
                rest.post('/v1/search/set_record',
                    {
                        record: RECORD2
                    },
                    (err, req, res, record) => {
                        assert.isNull(err);

                        TestModel.assertEqualSearchRecord(record, RECORD2);
                        callback();
                    }
                );
            },
            // Get all records
            (callback) => {
                rest.post('/v1/search/get_records',
                    {
                        filter: new FilterParams(),
                        paging: new PagingParams()
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        record1 = page.data[0];

                        callback();
                    }
                )
            },
            // Update the record
            (callback) => {
                record1.name = 'Name Name';

                rest.post('/v1/search/update_record',
                    {
                        record: record1
                    },
                    (err, req, res, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        assert.equal(record1.id, record.id);
                        assert.equal('Name Name', record.name);

                        callback();
                    }
                )
            },
            // Delete the record
            (callback) => {
                rest.post('/v1/search/delete_record_by_id',
                    {
                        record_id: record1.id
                    },
                    (err, req, res, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        assert.equal(record1.id, record.id);

                        callback();
                    }
                )
            },
            // Try to get deleted record
            (callback) => {
                rest.post('/v1/search/get_record_by_id',
                    {
                        record_id: record1.id
                    },
                    (err, req, res, record) => {
                        assert.isNull(err);

                        //assert.isEmpty(record || null);

                        callback();
                    }
                )
            }
        ], done);
    });

});