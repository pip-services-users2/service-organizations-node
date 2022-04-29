import { ConfigParams } from 'pip-services3-commons-nodex';

import { OrganizationsMemoryPersistence } from '../../src/persistence/OrganizationsMemoryPersistence';
import { OrganizationsPersistenceFixture } from './OrganizationsPersistenceFixture';

suite('OrganizationsMemoryPersistence', ()=> {
    let persistence: OrganizationsMemoryPersistence;
    let fixture: OrganizationsPersistenceFixture;
    
    setup(async () => {
        persistence = new OrganizationsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new OrganizationsPersistenceFixture(persistence);
        
        persistence.open(null);
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