const geojson = require('geojson-utils');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IdGenerator } from 'pip-services3-commons-nodex';
import { RandomInteger } from 'pip-services3-commons-nodex';
import { NotFoundException } from 'pip-services3-commons-nodex';
import { BadRequestException } from 'pip-services3-commons-nodex';
import { InternalException } from 'pip-services3-commons-nodex';

import { OrganizationV1 } from '../data/version1/OrganizationV1';
import { IOrganizationsPersistence } from '../persistence/IOrganizationsPersistence';
import { IOrganizationsController } from './IOrganizationsController';
import { OrganizationsCommandSet } from './OrganizationsCommandSet';

export class OrganizationsController implements IConfigurable, IReferenceable, ICommandable, IOrganizationsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-organizations:persistence:*:*:1.0',
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(OrganizationsController._defaultConfig);
    private _persistence: IOrganizationsPersistence;
    private _commandSet: OrganizationsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IOrganizationsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new OrganizationsCommandSet(this);
        return this._commandSet;
    }

    public async getOrganizations(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<OrganizationV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getOrganizationById(correlationId: string, id: string): Promise<OrganizationV1> {
        return await this._persistence.getOneById(correlationId, id);
    }

    public async getOrganizationByCode(correlationId: string, code: string): Promise<OrganizationV1> {
        let filter = FilterParams.fromTuples(
            'code', code,
            'deleted', false
        );

        let page = await this._persistence.getPageByFilter(
            correlationId, filter, null
        );
        let organization = page && page.data.length > 0 ? page.data[0] : null;

        return organization;
    }

    private calculateBoundaries(geometry: any) {
        let coords = geometry.coordinates;
        let xAll = [], yAll = [];

        for (let i = 0; i < coords[0].length; i++) {
            xAll.push(coords[0][i][0])
            yAll.push(coords[0][i][1])
        }

        xAll = xAll.sort(function (a, b) { return a - b })
        yAll = yAll.sort(function (a, b) { return a - b })

        return {
            type: "Polygon",
            coordinates: [[xAll[0], yAll[0]], [xAll[xAll.length - 1], yAll[yAll.length - 1]]]
        };
    }

    private calculateGeometry(organization: OrganizationV1) {
        if (organization.center) {
            organization.geometry = geojson.drawCircle(organization.radius * 1000, organization.center, 10);
            organization.boundaries = this.calculateBoundaries(organization.geometry);
        } else if (organization.geometry) {
            organization.center = geojson.centroid(organization.geometry);
            organization.boundaries = this.calculateBoundaries(organization.geometry);
        }
    }

    private fixOrganization(organization: OrganizationV1): void {
        if (typeof organization.center == 'string')
            organization.center = JSON.parse(organization.center);
        if (typeof organization.geometry == 'string')
            organization.geometry = JSON.parse(organization.geometry);

        organization.code = organization.code ? organization.code.toUpperCase() : null;

        organization.radius = organization.radius || 10;
    }

    private generateRandomCode(organization: OrganizationV1): string {
        if (organization.name) {
            return organization.name.replace(/\W/g, '').toUpperCase().substr(0, 5)
                + Math.round(10 + Math.random() * 89).toString();
        } else {
            return Math.round(100000 + Math.random() * 899999).toString();
        }
    }

    private async validateOrGenerateCode(correlationId: string, organization: OrganizationV1): Promise<void> {
        // Check provided code
        if (organization.code != null) {
            let data = await this.getOrganizationByCode(correlationId, organization.code);
            if (data != null) {
                throw new BadRequestException(
                    correlationId,
                    'ORGANIZATION_CODE_USED',
                    'Organization code ' + organization.code + ' has already been used'
                ).withDetails('code', organization.code);
            }
        }
        // Generate and check a random code
        else {
            do {
                organization.code = this.generateRandomCode(organization);
                let data = await this.getOrganizationByCode(correlationId, organization.code)
                if (data) organization.code = null;
            }
            while (organization.code == null);
        }
    }

    public async generateCode(correlationId: string, orgId: string): Promise<string> {
        let oldOrganization: OrganizationV1 = null;
        let code: string = null;

        oldOrganization = await this._persistence.getOneById(correlationId, orgId);
        
        if (oldOrganization == null) {
            throw new NotFoundException(
                correlationId,
                'ORGANIZATION_NOT_FOUND',
                'Organization ' + orgId + ' was not found'
            ).withDetails('org_id', orgId);
        }

        do {
            code = this.generateRandomCode(oldOrganization);
            let data = await this.getOrganizationByCode(correlationId, code);
            if (data) code = null;
        } while(code == null)

        return code;
    }

    public async createOrganization(correlationId: string, organization: OrganizationV1): Promise<OrganizationV1> {
        let newOrganization: OrganizationV1;

        organization.id = organization.id || IdGenerator.nextLong();
        organization.create_time = organization.create_time || new Date();
        organization.active = organization.active != null ? organization.active : true;
        organization.version = RandomInteger.nextInteger(1, 255);

        this.fixOrganization(organization);
        this.calculateGeometry(organization);

        // Validate or generate code
        await this.validateOrGenerateCode(correlationId, organization);

        // Create organization
        newOrganization = await this._persistence.create(correlationId, organization);

        return newOrganization;
    }

    public async updateOrganization(correlationId: string, organization: OrganizationV1): Promise<OrganizationV1> {
        let oldOrganization: OrganizationV1 = null;
        let newOrganization: OrganizationV1 = null;

        this.fixOrganization(organization);
        this.calculateGeometry(organization);


        oldOrganization = await this._persistence.getOneById(correlationId, organization.id);

        if (oldOrganization == null) {
            throw new NotFoundException(
                correlationId,
                'ORGANIZATION_NOT_FOUND',
                'Organization ' + organization.id + ' was not found'
            ).withDetails('org_id', organization.id);
        }

        if (organization.code == null || organization.code != oldOrganization.code)
            await this.validateOrGenerateCode(correlationId, organization);

        organization.version = oldOrganization.version && oldOrganization.version < 255 ? oldOrganization.version + 1 : 1;

        newOrganization = await this._persistence.update(correlationId, organization);

        return newOrganization;
    }

    public async deleteOrganizationById(correlationId: string, id: string): Promise<OrganizationV1> {
        let oldOrganization: OrganizationV1 = null;
        let newOrganization: OrganizationV1;

        // Todo: Implement logical deletion
        // Get organization
        oldOrganization = await this._persistence.getOneById(correlationId, id);

        // Set logical deletion flag
        if (oldOrganization == null) {
            return;
        }

        newOrganization = Object.assign({}, oldOrganization);
        newOrganization.deleted = true;

        newOrganization = await this._persistence.update(correlationId, newOrganization);
        // oldOrganization = await this._persistence.deleteById(correlationId, id);

        return newOrganization;
    }

}
