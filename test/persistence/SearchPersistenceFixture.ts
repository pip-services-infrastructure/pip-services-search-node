let async = require('async');
let assert = require('chai').assert;

import { FilterParams, SortParams, SortField } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { SearchRecordV1 } from '../../src/data/version1/SearchRecordV1';
import { ISearchPersistence } from '../../src/persistence/ISearchPersistence';
import { TestModel } from '../data/TestModel';

const RECORD1: SearchRecordV1 = TestModel.createSearchRecord1();
const RECORD2: SearchRecordV1 = TestModel.createSearchRecord2();
const RECORD3: SearchRecordV1 = TestModel.createSearchRecord3();

export class SearchPersistenceFixture {
    private _persistence: ISearchPersistence;
    private _timeout: number;

    public constructor(persistence: ISearchPersistence, timeout: number = 0) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
        this._timeout = timeout;
    }

    private testCreateSearch(done) {
        async.series([
            // Create the first record
            (callback) => {
                this._persistence.create(
                    null,
                    RECORD1,
                    (err, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        TestModel.assertEqualSearchRecord(RECORD1, record);

                        callback();
                    }
                );
            },
            // Create the second record
            (callback) => {
                this._persistence.create(
                    null,
                    RECORD2,
                    (err, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        TestModel.assertEqualSearchRecord(RECORD2, record);

                        callback();
                    }
                );
            },
            // Create the third record
            (callback) => {
                this._persistence.create(
                    null,
                    RECORD3,
                    (err, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        TestModel.assertEqualSearchRecord(RECORD3, record);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testCrudOperations(done) {
        let record1: SearchRecordV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateSearch(callback);
            },
            (callback) => {
                setTimeout(() => {
                    callback();
                }, this._timeout);
            },
            // Get all records
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        record1 = page.data[0];

                        callback();
                    }
                )
            },
            // Update the record
            (callback) => {
                record1.name = 'New Name';

                this._persistence.update(
                    null,
                    record1,
                    (err, record) => {
                        assert.isNull(err);

                        assert.isObject(record);
                        assert.equal(record1.id, record.id);
                        assert.equal('New Name', record.name);

                        callback();
                    }
                )
            },
            // Delete the record
            (callback) => {
                this._persistence.deleteById(
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
                this._persistence.getOneById(
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
    }

    public testGetWithFilters(done) {
        async.series([
            // Create items
            (callback) => {
                this.testCreateSearch(callback);
            },
            (callback) => {
                setTimeout(() => {
                    callback();
                }, this._timeout);
            },
            // Filter by id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'id', '1'
                    ),
                    new PagingParams(),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by type
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'type', 'Test type1'
                    ),
                    new PagingParams(),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                )
            },
            // Filter by name
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'name', 'Test name 1'
                    ),
                    new PagingParams(),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by search pattern
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'search', 'type1'
                    ),
                    new PagingParams(),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                )
            },
            // Filter by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'tags', ['red']
                    ),
                    new PagingParams(),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
            // Filter by time
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples(
                        'from_time', new Date(2005, 1, 1),
                        'to_time', new Date(2015, 1, 1),
                    ),
                    new PagingParams(),
                    null,
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 1);

                        callback();
                    }
                )
            },
        ], done);
    }

    public testSorting(done) {
        async.series([
            // Create items
            (callback) => {
                this.testCreateSearch(callback);
            },
            (callback) => {
                setTimeout(() => {
                    callback();
                }, this._timeout);
            },
            // Sort by type
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    new SortParams(new SortField('type', true)),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 3);

                        assert.equal(page.data[0].id, '1');
                        assert.equal(page.data[1].id, '3');
                        assert.equal(page.data[2].id, '2');

                        callback();
                    }
                )
            },
            // Sort by time
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    new SortParams(new SortField('time', true)),
                    (err, page) => {
                        assert.isNull(err);

                        assert.lengthOf(page.data, 3);

                        assert.equal(page.data[0].id, '2');
                        assert.equal(page.data[1].id, '1');
                        assert.equal(page.data[2].id, '3');
                        callback();
                    }
                )
            },
        ], done);
    }
}
