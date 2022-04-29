import { OrganizationsFilePersistence } from '../../src/persistence/OrganizationsFilePersistence';
import { OrganizationsPersistenceFixture } from './OrganizationsPersistenceFixture';

suite('OrganizationsFilePersistence', ()=> {
    let persistence: OrganizationsFilePersistence;
    let fixture: OrganizationsPersistenceFixture;
    
    setup(async () => {
        persistence = new OrganizationsFilePersistence('./data/organizations.test.json');

        fixture = new OrganizationsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});