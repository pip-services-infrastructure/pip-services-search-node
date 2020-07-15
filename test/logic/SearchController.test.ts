// let async = require('async');
// let assert = require('chai').assert;

// import { ConfigParams } from 'pip-services3-commons-node';
// import { Descriptor } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';
// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';

// import { SearchRecordV1 } from '../../src/data/version1/SearchRecordV1';
// import { SearchMemoryPersistence } from '../../src/persistence/SearchMemoryPersistence';
// import { SearchController } from '../../src/logic/SearchController';

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

// suite('SearchController', () => {
//     let persistence: SearchMemoryPersistence;
//     let controller: SearchController;

//     setup((done) => {
//         persistence = new SearchMemoryPersistence();
//         persistence.configure(new ConfigParams());

//         controller = new SearchController();
//         controller.configure(new ConfigParams());

//         let references = References.fromTuples(
//             new Descriptor('pip-services-search', 'persistence', 'memory', 'default', '1.0'), persistence,
//             new Descriptor('pip-services-search', 'controller', 'default', 'default', '1.0'), controller
//         );

//         controller.setReferences(references);

//         persistence.open(null, done);
//     });

//     teardown((done) => {
//         persistence.close(null, done);
//     });

//     test('CRUD Operations', (done) => {
//         let record1: SearchRecordV1;

//         async.series([
//             // Create the first record
//             (callback) => {
//                 controller.setRecord(
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
//                 controller.setRecord(
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
//             // Get all records
//             (callback) => {
//                 controller.getRecords(
//                     null,
//                     new FilterParams(),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         record1 = page.data[0];

//                         callback();
//                     }
//                 )
//             },
//             // Update the record
//             (callback) => {
//                 record1.about = 'Updated About';

//                 controller.updateRecord(
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
//                 controller.deleteRecordById(
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
//                 controller.getRecordById(
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
//     });
// });