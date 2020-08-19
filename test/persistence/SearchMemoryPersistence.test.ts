import { ConfigParams } from 'pip-services3-commons-node';

import { SearchMemoryPersistence } from '../../src/persistence/SearchMemoryPersistence';
import { SearchPersistenceFixture } from './SearchPersistenceFixture';

suite('SearchMemoryPersistence', () => {
    let persistence: SearchMemoryPersistence;
    let fixture: SearchPersistenceFixture;

    setup((done) => {
        persistence = new SearchMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new SearchPersistenceFixture(persistence);

        persistence.open(null, done);
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilters(done);
    });

});