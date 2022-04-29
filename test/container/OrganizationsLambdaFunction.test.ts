const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { OrganizationV1 } from '../../src/data/version1/OrganizationV1';
import { OrganizationsLambdaFunction } from '../../src/container/OrganizationsLambdaFunction';

let ORGANIZATION1: OrganizationV1 = {
    id: '1',
    code: '111',
    name: 'Organization #1',
    description: 'Test organization #1',
    create_time: new Date(),
    creator_id: '123',
    active: true
};
let ORGANIZATION2: OrganizationV1 = {
    id: '2',
    code: null,
    name: 'Organization #2',
    description: 'Test organization #2',
    create_time: new Date(),
    creator_id: '123',
    active: true
};

suite('OrganizationsLambdaFunction', ()=> {
    let lambda: OrganizationsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-organizations:persistence:memory:default:1.0',
            'controller.descriptor', 'service-organizations:controller:default:default:1.0'
        );

        lambda = new OrganizationsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        var organization1, organization2;

        // Create one organization
        organization1 = await lambda.act(
            {
                role: 'organizations',
                cmd: 'create_organization',
                organization: ORGANIZATION1
            }
        );

        assert.isObject(organization1);
        assert.equal(organization1.name, ORGANIZATION1.name);
        assert.equal(organization1.description, ORGANIZATION1.description);
        assert.isNotNull(organization1.code);

        // Create another organization
        organization2 = await lambda.act(
            {
                role: 'organizations',
                cmd: 'create_organization',
                organization: ORGANIZATION2
            }
        );

        assert.isObject(organization2);
        assert.equal(organization2.name, ORGANIZATION2.name);
        assert.equal(organization2.description, ORGANIZATION2.description);
        assert.isNotNull(organization2.code);

        // Get all organizations
        let page = await lambda.act(
            {
                role: 'organizations',
                cmd: 'get_organizations'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the organization
        organization1.description = 'Updated Content 1';
        organization1 = await lambda.act(
            {
                role: 'organizations',
                cmd: 'update_organization',
                organization: organization1
            }
        );


        assert.isObject(organization1);
        assert.equal(organization1.description, 'Updated Content 1');
        assert.equal(organization1.name, ORGANIZATION1.name);

        // Get organization by code
        let organization = await lambda.act(
            {
                role: 'organizations',
                cmd: 'get_organization_by_code',
                code: organization1.code
            }
        );

        assert.isNotNull(organization);
        assert.equal(organization.id, organization1.id);

        // Generate code
        let code = await lambda.act(
            {
                role: 'organizations',
                cmd: 'generate_code',
                org_id: organization1.id
            }
        );

        assert.isNotNull(code);
            
        // Delete organization
        await lambda.act(
            {
                role: 'organizations',
                cmd: 'delete_organization_by_id',
                org_id: organization1.id
            }
        );

        // Try to get delete organization
        organization = await lambda.act(
            {
                role: 'organizations',
                cmd: 'get_organization_by_id',
                org_id: organization1.id
            }
        );

        assert.isNotNull(organization);
        assert.isTrue(organization.deleted);
    });
});