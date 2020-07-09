// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { Descriptor } from 'pip-services3-commons-node';
// import { ConfigParams } from 'pip-services3-commons-node';
// import { References } from 'pip-services3-commons-node';
// import { ConsoleLogger } from 'pip-services3-components-node';

// import { SearchV1 } from '../../src/data/version1/SearchV1';
// import { SearchTypeV1 } from '../../src/data/version1/SearchTypeV1';
// import { SearchStateV1 } from '../../src/data/version1/SearchStateV1';
// import { SearchMemoryPersistence } from '../../src/persistence/SearchMemoryPersistence';
// import { SearchController } from '../../src/logic/SearchController';
// import { SearchLambdaFunction } from '../../src/container/SearchLambdaFunction';

// let SEARCH1: SearchV1 = {
//     id: '1',
//     customer_id: '1',
//     type: SearchTypeV1.Visa,
//     number: '1111111111111111',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
//         postal_code: '85710',
//         country_code: 'US'
//     },
//     ccv: '213',
//     name: 'Test Search 1',
//     saved: true,
//     default: true,
//     state: SearchStateV1.Ok
// };
// let SEARCH2: SearchV1 = {
//     id: '2',
//     customer_id: '1',
//     type: SearchTypeV1.Visa,
//     number: '2222222222222222',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Search 2',
//     saved: true,
//     default: false,
//     state: SearchStateV1.Expired
// };

// suite('SearchLambdaFunction', ()=> {
//     let lambda: SearchLambdaFunction;

//     suiteSetup((done) => {
//         let config = ConfigParams.fromTuples(
//             'logger.descriptor', 'pip-services:logger:console:default:1.0',
//             'persistence.descriptor', 'pip-services-search:persistence:memory:default:1.0',
//             'controller.descriptor', 'pip-services-search:controller:default:default:1.0'
//         );

//         lambda = new SearchLambdaFunction();
//         lambda.configure(config);
//         lambda.open(null, done);
//     });
    
//     suiteTeardown((done) => {
//         lambda.close(null, done);
//     });
    
//     test('CRUD Operations', (done) => {
//         var search1, search2: SearchV1;

//         async.series([
//         // Create one Search
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'search',
//                         cmd: 'create_search',
//                         search: SEARCH1
//                     },
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isObject(search);
//                         assert.equal(search.number, SEARCH1.number);
//                         assert.equal(search.expire_year, SEARCH1.expire_year);
//                         assert.equal(search.customer_id, SEARCH1.customer_id);

//                         search1 = search;

//                         callback();
//                     }
//                 );
//             },
//         // Create another Search
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'search',
//                         cmd: 'create_search',
//                         search: SEARCH2
//                     },
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isObject(search);
//                         assert.equal(search.number, SEARCH2.number);
//                         assert.equal(search.expire_year, SEARCH2.expire_year);
//                         assert.equal(search.customer_id, SEARCH2.customer_id);

//                         search2 = search;

//                         callback();
//                     }
//                 );
//             },
//         // Get all Search
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'search',
//                         cmd: 'get_search' 
//                     },
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Update the Search
//             (callback) => {
//                 search1.name = 'Updated Search 1';

//                 lambda.act(
//                     {
//                         role: 'search',
//                         cmd: 'update_search',
//                         search: search1
//                     },
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isObject(search);
//                         assert.equal(search.name, 'Updated Search 1');
//                         assert.equal(search.id, SEARCH1.id);

//                         search1 = search;

//                         callback();
//                     }
//                 );
//             },
//         // Delete Search
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'search',
//                         cmd: 'delete_search_by_id',
//                         search_id: search1.id,
//                         customer_id: search1.customer_id
//                     },
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete Search
//             (callback) => {
//                 lambda.act(
//                     {
//                         role: 'search',
//                         cmd: 'get_search_by_id',
//                         search_id: search1.id,
//                         customer_id: search1.customer_id
//                     },
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isNull(search || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     });
// });