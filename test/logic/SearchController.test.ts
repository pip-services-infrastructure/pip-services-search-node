let async = require('async');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { SearchRecordV1 } from '../../src/data/version1/SearchRecordV1';
import { SearchMemoryPersistence } from '../../src/persistence/SearchMemoryPersistence';
import { SearchController } from '../../src/logic/SearchController';
import { TestModel } from '../data/TestModel';

const RECORD1: SearchRecordV1 = TestModel.createSearchRecord1();
const RECORD2: SearchRecordV1 = TestModel.createSearchRecord2();

suite('SearchController', () => {
    let persistence: SearchMemoryPersistence;
    let controller: SearchController;

    setup((done) => {
        persistence = new SearchMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new SearchController();
        controller.configure(new ConfigParams());

        let references = References.fromTuples(
            new Descriptor('pip-services-search', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-search', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        let record1: SearchRecordV1;

        async.series([
            // Create the first record
            (callback) => {
                controller.setRecord(
                    null,
                    RECORD1,
                    (err, record) => {
                        assert.isNull(err);
                        TestModel.assertEqualSearchRecord(record, RECORD1);
                        callback();
                    }
                );
            },
            // Create the second record
            (callback) => {
                controller.setRecord(
                    null,
                    RECORD2,
                    (err, record) => {
                        assert.isNull(err);
                        TestModel.assertEqualSearchRecord(record, RECORD2);
                        callback();
                    }
                );
            },
            // Get all records
            (callback) => {
                controller.getRecords(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
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
                record1.field1 = 'Updated Field1';

                controller.updateRecord(
                    null,
                    record1,
                    (err, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        assert.equal(record1.id, record.id);
                        assert.equal('Updated Field1', record.field1);

                        callback();
                    }
                )
            },
            // Delete the record
            (callback) => {
                controller.deleteRecordById(
                    null,
                    record1.id,
                    (err, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        assert.equal(record1.id, record.id);

                        callback();
                    }
                )
            },
            // Try to get deleted record
            (callback) => {
                controller.getRecordById(
                    null,
                    record1.id,
                    (err, record) => {
                        assert.isNull(err);

                        assert.isNull(record || null);

                        callback();
                    }
                )
            }
        ], done);
    });
});