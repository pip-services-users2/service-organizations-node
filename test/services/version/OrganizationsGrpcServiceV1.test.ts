const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { OrganizationV1 } from '../../../src/data/version1/OrganizationV1';
import { OrganizationsMemoryPersistence } from '../../../src/persistence/OrganizationsMemoryPersistence';
import { OrganizationsController } from '../../../src/logic/OrganizationsController';
import { OrganizationsGrpcServiceV1 } from '../../../src/services/version1/OrganizationsGrpcServiceV1';
import { OrganizationsGrpcConverterV1 } from '../../../src/services/version1/OrganizationsGrpcConverterV1';

var grpcConfig = ConfigParams.fromTuples(
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

suite('OrganizationsGrpcServiceV1', ()=> {
    let service: OrganizationsGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new OrganizationsMemoryPersistence();
        let controller = new OrganizationsController();

        service = new OrganizationsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-organizations', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-organizations', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-organizations', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/organizations_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).organizations_v1.Organizations;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        let organization1, organization2: OrganizationV1;

        // Create one organization
        let response = await new Promise<any>((resolve, reject) => {
            client.create_organization(
                {
                    organization: ORGANIZATION1
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let organization = response ? response.organization : null;

        assert.isObject(organization);
        assert.equal(organization.name, ORGANIZATION1.name);
        assert.equal(organization.description, ORGANIZATION1.description);

        organization1 = organization;

        // Create another organization
        response = await new Promise<any>((resolve, reject) => {
            client.create_organization(
                {
                    organization: ORGANIZATION2
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        organization = response ? response.organization : null;

        assert.isObject(organization);
        assert.equal(organization.name, ORGANIZATION2.name);
        assert.equal(organization.description, ORGANIZATION2.description);

        organization2 = organization;

        // Get all organizations
        response = await new Promise<any>((resolve, reject) => {
            client.get_organizations(
                {
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let page = response ? response.page : null;

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the organization
        organization1.description = 'Updated Content 1';
        organization1.center = { type: 'Point', coordinates: [32, -110] };
        organization1.radius = 5;

        organization = OrganizationsGrpcConverterV1.fromOrganization(organization1);

        response = await new Promise<any>((resolve, reject) => {
            client.update_organization(
                {
                    organization: organization.toObject()
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        organization = response ? response.organization : null;

        assert.isObject(organization);
        assert.equal(organization.description, 'Updated Content 1');
        assert.equal(organization.name, organization1.name);
        assert.isNotNull(organization.boundaries);
        assert.isNotNull(organization.geometry);

        organization1 = organization;


        // Get organization by code
        response = await new Promise<any>((resolve, reject) => {
            client.get_organization_by_code(
                {
                    code: organization1.code
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        organization = response ? response.organization : null;

        assert.isObject(organization);
        assert.equal(organization.id, organization1.id);

        // Generate new organization code
        response = await new Promise<any>((resolve, reject) => {
            client.generate_code(
                {
                    org_id: organization1.id
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        let code = response ? response.code : null;
        assert.isNotNull(code);

        // Delete organization
        response = await new Promise<any>((resolve, reject) => {
            client.delete_organization_by_id(
                {
                    org_id: organization1.id
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        organization = response ? response.organization : null;

        assert.equal(organization.id, organization1.id);


        // Try to get delete organization
        response = await new Promise<any>((resolve, reject) => {
            client.get_organization_by_id(
                {
                    org_id: organization1.id
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });

        organization = response ? response.organization : null;

        assert.isNotNull(organization);
        assert.isTrue(organization.deleted);
    });

});
