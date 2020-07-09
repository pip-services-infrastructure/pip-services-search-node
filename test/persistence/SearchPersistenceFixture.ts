// let _ = require('lodash');
// let async = require('async');
// let assert = require('chai').assert;

// import { FilterParams } from 'pip-services3-commons-node';
// import { PagingParams } from 'pip-services3-commons-node';

// import { SearchV1 } from '../../src/data/version1/SearchV1';
// import { SearchTypeV1 } from '../../src/data/version1/SearchTypeV1';
// import { SearchStateV1 } from '../../src/data/version1/SearchStateV1';

// import { ISearchPersistence } from '../../src/persistence/ISearchPersistence';
// import { RatingV1 } from '../../src/data/version1/RatingV1';

// let SEARCH1: SearchV1 = {
//     id: '1',
//     customer_id: '1',
//     type: SearchTypeV1.Visa,
//     number: '4032036094894795',
//     expire_month: 1,
//     expire_year: 2021,
//     first_name: 'Bill',
//     last_name: 'Gates',
//     billing_address: {
//         line1: '2345 Swan Rd',
//         city: 'Tucson',
//         state: 'AZ',
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
//     number: '4032037578262780',
//     expire_month: 4,
//     expire_year: 2028,
//     first_name: 'Joe',
//     last_name: 'Dow',
//     billing_address: {
//         line1: '123 Broadway Blvd',
//         city: 'New York',
//         state: 'NY',
//         postal_code: '123001',
//         country_code: 'US'
//     },
//     name: 'Test Search 2',
//     saved: true,
//     default: false,
//     state: SearchStateV1.Expired
// };
// let SEARCH3: SearchV1 = {
//     id: '3',
//     customer_id: '2',
//     type: SearchTypeV1.Visa,
//     number: '4032037578262780',
//     expire_month: 5,
//     expire_year: 2022,
//     first_name: 'Steve',
//     last_name: 'Jobs',
//     billing_address: {
//         line1: '234 6th Str',
//         city: 'Los Angeles',
//         state: 'CA',
//         postal_code: '65320',
//         country_code: 'US'
//     },
//     ccv: '124',
//     name: 'Test Search 2',
//     state: SearchStateV1.Ok
// };

// export class SearchPersistenceFixture {
//     private _persistence: ISearchPersistence;
    
//     constructor(persistence) {
//         assert.isNotNull(persistence);
//         this._persistence = persistence;
//     }

//     private testCreateSearch(done) {
//         async.series([
//         // Create one Search
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     SEARCH1,
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isObject(search);
//                         assert.equal(search.first_name, SEARCH1.first_name);
//                         assert.equal(search.last_name, SEARCH1.last_name);
//                         assert.equal(search.expire_year, SEARCH1.expire_year);
//                         assert.equal(search.customer_id, SEARCH1.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create another Search
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     SEARCH2,
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isObject(search);
//                         assert.equal(search.first_name, SEARCH2.first_name);
//                         assert.equal(search.last_name, SEARCH2.last_name);
//                         assert.equal(search.expire_year, SEARCH2.expire_year);
//                         assert.equal(search.customer_id, SEARCH2.customer_id);

//                         callback();
//                     }
//                 );
//             },
//         // Create yet another Search
//             (callback) => {
//                 this._persistence.create(
//                     null,
//                     SEARCH3,
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isObject(search);
//                         assert.equal(search.first_name, SEARCH3.first_name);
//                         assert.equal(search.last_name, SEARCH3.last_name);
//                         assert.equal(search.expire_year, SEARCH3.expire_year);
//                         assert.equal(search.customer_id, SEARCH3.customer_id);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }
                
//     testCrudOperations(done) {
//         let search1: SearchV1;

//         async.series([
//         // Create items
//             (callback) => {
//                 this.testCreateSearch(callback);
//             },
//         // Get all Search
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     new FilterParams(),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 3);

//                         search1 = page.data[0];

//                         callback();
//                     }
//                 );
//             },
//         // Update the Search
//             (callback) => {
//                 search1.name = 'Updated Search 1';

//                 this._persistence.update(
//                     null,
//                     search1,
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isObject(search);
//                         assert.equal(search.name, 'Updated Search 1');
//                         // PayPal changes id on update
//                         //!!assert.equal(search.id, search1.id);

//                         search1 = search;

//                         callback();
//                     }
//                 );
//             },
//         // Delete Search
//             (callback) => {
//                 this._persistence.deleteById(
//                     null,
//                     search1.id,
//                     (err) => {
//                         assert.isNull(err);

//                         callback();
//                     }
//                 );
//             },
//         // Try to get delete Search
//             (callback) => {
//                 this._persistence.getOneById(
//                     null,
//                     search1.id,
//                     (err, search) => {
//                         assert.isNull(err);

//                         assert.isNull(search || null);

//                         callback();
//                     }
//                 );
//             }
//         ], done);
//     }

//     testGetWithFilter(done) {
//         async.series([
//         // Create Search
//             (callback) => {
//                 this.testCreateSearch(callback);
//             },
//         // Get Search filtered by customer id
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         customer_id: '1'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get Search by state
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         state: 'ok'
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal calculate states by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get Search by saved
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         saved: true
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         // Get Search by ids
//             (callback) => {
//                 this._persistence.getPageByFilter(
//                     null,
//                     FilterParams.fromValue({
//                         ids: ['1', '3']
//                     }),
//                     new PagingParams(),
//                     (err, page) => {
//                         assert.isNull(err);

//                         assert.isObject(page);
//                         // PayPal manages ids by itself
//                         //assert.lengthOf(page.data, 2);

//                         callback();
//                     }
//                 );
//             },
//         ], done);
//     }

// }
