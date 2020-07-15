// let async = require('async');
// let assert = require('chai').assert;

// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';

// import { SearchRecordV1 } from '../../src/data/version1/SearchRecordV1';
// import { ISearchPersistence } from '../../src/persistence/ISearchPersistence';

// const RECORD1: SearchRecordV1 = {
//     id: '1',
//     about: 'Test about 1',
//     register_time: new Date(),
//     bank_name: 'Bank 1',
//     account_num: '111111',
//     routing_num: '111111'
// };
// const RECORD2: SearchRecordV1 = {
//     id: '2',
//     about: 'Test about 2',
//     register_time: new Date(),
//     bank_name: 'Bank 2',
//     account_num: '222222',
//     routing_num: '222222'
// };
// const RECORD3: SearchRecordV1 = {
//     id: '3',
//     about: 'Test about 3',
//     register_time: new Date(),
//     bank_name: 'Bank 1',
//     account_num: '333333',
//     routing_num: '333333'
// };

// export class SearchPersistenceFixture {
//     private _persistence: ISearchPersistence;

//     public constructor(persistence: ISearchPersistence) {
//         assert.isNotNull(persistence);
//         this._persistence = persistence;
//     }

//     private testCreateSearch(done) {
//         async.series([
//             // Create the first record
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     RECORD1,
//                     (err, record) => {
//                         assert.isNull(err);

//                         assert.isObject(record);
//                         assert.equal(RECORD1.id, record.id);
//                         assert.equal(RECORD1.about, record.about);
//                         assert.equal(RECORD1.register_time.getTime(), record.register_time.getTime());
//                         assert.equal(RECORD1.bank_name, record.bank_name);
//                         assert.equal(RECORD1.account_num, record.account_num);
//                         assert.equal(RECORD1.routing_num, record.routing_num);

//                         callback();
//                     }
//                 );
//             },
//             // Create the second record
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     RECORD2,
//                     (err, record) => {
//                         assert.isNull(err);

//                         assert.isObject(record);
//                         assert.equal(RECORD2.id, record.id);
//                         assert.equal(RECORD2.about, record.about);
//                         assert.equal(RECORD2.register_time.getTime(), record.register_time.getTime());
//                         assert.equal(RECORD2.bank_name, record.bank_name);
//                         assert.equal(RECORD2.account_num, record.account_num);
//                         assert.equal(RECORD2.routing_num, record.routing_num);

//                         callback();
//                     }
//                 );
//             },
//             // Create the third record
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     RECORD3,
//                     (err, record) => {
//                         assert.isNull(err);

//                         assert.isObject(record);
//                         assert.equal(RECORD3.id, record.id);
//                         assert.equal(RECORD3.about, record.about);
//                         assert.equal(RECORD3.register_time.getTime(), record.register_time.getTime());
//                         assert.equal(RECORD3.bank_name, record.bank_name);
//                         assert.equal(RECORD3.account_num, record.account_num);
//                         assert.equal(RECORD3.routing_num, record.routing_num);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }

//     public testCrudOperations(done) {
//         let record1: SearchRecordV1;

//         async.series([
//             // Create items
//             (callback) => {
//                 this.testCreateSearch(callback);
//             },
//             // Get all records
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     new FilterParams(),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 3);

//                         record1 = page.data[0];

//                         callback();
//                     }
//                 )
//             },
//             // Update the record
//             (callback) => {
//                 record1.about = 'Updated About';

//                 this._persistence.update(
//                     null,
//                     record1,
//                     (err, record) => {
//                         assert.isNull(err);

//                         assert.isObject(record);
//                         assert.equal(record1.id, record.id);
//                         assert.equal('Updated About', record.about);

//                         callback();
//                     }
//                 )
//             },
//             // Delete the record
//             (callback) => {
//                 this._persistence.deleteById(
//                     null,
//                     record1.id,
//                     (err, record) => {
//                         assert.isNull(err);

//                         assert.isObject(record);
//                         assert.equal(record1.id, record.id);

//                         callback();
//                     }
//                 )
//             },
//             // Try to get deleted record
//             (callback) => {
//                 this._persistence.getOneById(
//                     null,
//                     record1.id,
//                     (err, record) => {
//                         assert.isNull(err);

//                         assert.isNull(record || null);

//                         callback();
//                     }
//                 )
//             }
//         ], done);
//     }

//     public testGetWithFilters(done) {
//         async.series([
//             // Create items
//             (callback) => {
//                 this.testCreateSearch(callback);
//             },
//             // Filter by id
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromTuples(
//                         'id', '1'
//                     ),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.lengthOf(page.data, 1);

//                         callback();
//                     }
//                 )
//             },
//             // Filter by account_num
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromTuples(
//                         'account_num', '222222'
//                     ),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.lengthOf(page.data, 1);

//                         callback();
//                     }
//                 )
//             },
//             // Filter by bank_name
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromTuples(
//                         'bank_name', 'Bank 1'
//                     ),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 )
//             }
//         ], done);
//     }
// }
