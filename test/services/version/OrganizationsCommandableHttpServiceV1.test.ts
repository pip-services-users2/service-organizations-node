const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { OrganizationV1 } from '../../../src/data/version1/OrganizationV1';
import { OrganizationsMemoryPersistence } from '../../../src/persistence/OrganizationsMemoryPersistence';
import { OrganizationsController } from '../../../src/logic/OrganizationsController';
import { OrganizationsCommandableHttpServiceV1 } from '../../../src/services/version1/OrganizationsCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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
    code: '222',
    name: 'Organization #2',
    description: 'Test organization #2',
    create_time: new Date(),
    creator_id: '123',
    active: true
};

suite('OrganizationsCommandableHttpServiceV1', ()=> {    
    let persistence: OrganizationsMemoryPersistence;
    let service: OrganizationsCommandableHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        persistence = new OrganizationsMemoryPersistence();
        let controller = new OrganizationsController();

        service = new OrganizationsCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-organizations', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-organizations', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-organizations', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(async () => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
        await persistence.clear(null);
    });
    
    
    test('CRUD Operations', async () => {
        let organization1, organization2: OrganizationV1;

        // Create one organization
        organization1 = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/organizations/create_organization',
                {
                    organization: ORGANIZATION1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(organization1);
        assert.equal(organization1.name, ORGANIZATION1.name);
        assert.equal(organization1.description, ORGANIZATION1.description);

        // Create another organization
        organization2 = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/organizations/create_organization',
                {
                    organization: ORGANIZATION2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(organization2);
        assert.equal(organization2.name, ORGANIZATION2.name);
        assert.equal(organization2.description, ORGANIZATION2.description);


        // Get all organizations
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/organizations/get_organizations',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the organization
        organization1.description = 'Updated Content 1';
        organization1.center = { type: 'Point', coordinates: [32, -110] };
        organization1.radius = 5;

        organization1 = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/organizations/update_organization',
                {
                    organization: organization1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(organization1);
        assert.equal(organization1.description, 'Updated Content 1');
        assert.equal(organization1.name, organization1.name);
        assert.isNotNull(organization1.boundaries);
        assert.isNotNull(organization1.geometry);

        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/organizations/delete_organization_by_id',
                {
                    org_id: organization1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.equal(result.id, organization1.id);

        // Try to get delete organization
        let organization = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/organizations/get_organization_by_id',
                {
                    org_id: organization1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isNotNull(organization);
        assert.isTrue(organization.deleted);
    });
});