// import { ConfigParams } from 'pip-services3-commons-node';

// import { SearchFilePersistence } from '../../src/persistence/SearchFilePersistence';
// import { SearchPersistenceFixture } from './SearchPersistenceFixture';

// suite('SearchFilePersistence', ()=> {
//     let persistence: SearchFilePersistence;
//     let fixture: SearchPersistenceFixture;
    
//     setup((done) => {
//         persistence = new SearchFilePersistence('./data/search.test.json');

//         fixture = new SearchPersistenceFixture(persistence);

//         persistence.open(null, (err) => {
//             persistence.clear(null, done);
//         });
//     });
    
//     teardown((done) => {
//         persistence.close(null, done);
//     });
        
//     test('CRUD Operations', (done) => {
//         fixture.testCrudOperations(done);
//     });

//     test('Get with Filters', (done) => {
//         fixture.testGetWithFilter(done);
//     });

// });