let process = require('process');

import { ConfigParams } from 'pip-services3-commons-node';

import { SearchElasticPersistence } from '../../src/persistence/SearchElasticPersistence';
import { SearchPersistenceFixture } from './SearchPersistenceFixture';

suite('SearchElasticPersistence', () => {
    let persistence: SearchElasticPersistence;
    let fixture: SearchPersistenceFixture;

    setup((done) => {
        let host = process.env['ELASTICSEARCH_SERVICE_HOST'] || 'localhost';
        let port = process.env['ELASTICSEARCH_SERVICE_PORT'] || 9200;

        // Exit if elastic connection is not set
        if (host == '')
            return;

        var config = ConfigParams.fromTuples(
            'index', 'search',
            'connection.host', host,
            'connection.port', port
        );

        persistence = new SearchElasticPersistence();
        persistence.configure(config);

        fixture = new SearchPersistenceFixture(persistence, 1000);

        persistence.open(null, (err) => {
            if (err) {
                done(err);
                return;
            }

            persistence.clear(null, (err) => {
                done(err);
            });
        });
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

    test('Sorting', (done) => {
        fixture.testSorting(done);
    });
});
