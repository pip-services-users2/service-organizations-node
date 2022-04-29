const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { OrganizationV1 } from '../../src/data/version1/OrganizationV1';

import { IOrganizationsPersistence } from '../../src/persistence/IOrganizationsPersistence';

let ORGANIZATION1: OrganizationV1 = {
    id: '1',
    code: '111',
    name: 'Organization #1',
    description: 'Test organization #1',
    create_time: new Date(),
    creator_id: '123',
    language: 'ru',
    active: true
};
let ORGANIZATION2: OrganizationV1 = {
    id: '2',
    code: '222',
    name: 'Organization #2',
    description: 'Test organization #2',
    create_time: new Date(),
    creator_id: '123',
    active: true
};
let ORGANIZATION3: OrganizationV1 = {
    id: '3',
    code: '333',
    name: 'Organization #3',
    description: 'Test organization #3',
    create_time: new Date(),
    creator_id: '123',
    active: true
};

export class OrganizationsPersistenceFixture {
    private _persistence: IOrganizationsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateOrganizations() {
        // Create one organization
        let organization = await this._persistence.create(null, ORGANIZATION1);

        assert.isObject(organization);
        assert.equal(organization.name, ORGANIZATION1.name);
        assert.equal(organization.description, ORGANIZATION1.description);
        assert.equal(organization.active, ORGANIZATION1.active);
        assert.equal(organization.language, ORGANIZATION1.language);
        assert.isNotNull(organization.code);

        // Create another organization
        organization = await this._persistence.create(null, ORGANIZATION2);
        
        assert.isObject(organization);
        assert.equal(organization.name, ORGANIZATION2.name);
        assert.equal(organization.description, ORGANIZATION2.description);
        assert.equal(organization.active, ORGANIZATION2.active);
        assert.isNotNull(organization.code);

        // Create yet another organization
        organization = await this._persistence.create(null, ORGANIZATION3);

        assert.isObject(organization);
        assert.equal(organization.name, ORGANIZATION3.name);
        assert.equal(organization.description, ORGANIZATION3.description);
        assert.equal(organization.active, ORGANIZATION3.active);
        assert.isNotNull(organization.code);
    }
                
    public async testCrudOperations() {
        let organization1: OrganizationV1;

        // Create organizations
        await this.testCreateOrganizations();

        // Get all organizations
        let page = await this._persistence.getPageByFilter(null, new FilterParams(), new PagingParams());

        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        organization1 = page.data[0];

        // Update the organization
        organization1.description = 'Updated description 1';

        let organization = await this._persistence.update(null, organization1);

        assert.isObject(organization);
        assert.equal(organization.description, 'Updated description 1');
        assert.equal(organization.id, organization1.id);

        // Delete organization
        await this._persistence.deleteById(null, organization1.id);

        // Try to get delete organization
        organization = await this._persistence.getOneById(null, organization1.id);

        assert.isNull(organization || null);
    }

    public async testGetWithFilter() {
        // Create organizations
        await this.testCreateOrganizations();

        // Get organizations filtered by tags
        let organizations = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                ids: ['2', '3']
            }),
            new PagingParams()
        );

        assert.isObject(organizations);
        assert.lengthOf(organizations.data, 2);


        // Get organizations except certain ids
        organizations = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                except_ids: ORGANIZATION1.id + ',' + ORGANIZATION3.id
            }),
            new PagingParams()
        );

        assert.isObject(organizations);
        assert.lengthOf(organizations.data, 1);

        // Get organizations filtered by status
        organizations = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                search: '3'
            }),
            new PagingParams()
        );

        assert.isObject(organizations);
        assert.lengthOf(organizations.data, 1);
    }

}
