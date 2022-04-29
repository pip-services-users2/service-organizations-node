const services = require('../../../../src/protos/organizations_v1_grpc_pb');
const messages = require('../../../../src/protos/organizations_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IOrganizationsController } from '../../logic/IOrganizationsController';
import { OrganizationsGrpcConverterV1 } from './OrganizationsGrpcConverterV1';

export class OrganizationsGrpcServiceV1 extends GrpcService {
    private _controller: IOrganizationsController;
	
    public constructor() {
        super(services.OrganizationsService);
        this._dependencyResolver.put('controller', new Descriptor("service-organizations", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IOrganizationsController>('controller');
    }
    
    private async getOrganizations(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        OrganizationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = OrganizationsGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.OrganizationPageReply();

        try {
            let result = await this._controller.getOrganizations(
                correlationId,
                filter,
                paging
            );
            let page = OrganizationsGrpcConverterV1.fromOrganizationPage(result);
            response.setPage(page);
        } catch(err) {
            let error = OrganizationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getOrganizationById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();

        let response = new messages.OrganizationObjectReply();

        try {
            let result = await this._controller.getOrganizationById(correlationId, orgId);
            let organization = OrganizationsGrpcConverterV1.fromOrganization(result);
            response.setOrganization(organization);
        } catch (err) {
            let error = OrganizationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getOrganizationByCode(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let code = call.request.getCode();

        let response = new messages.OrganizationObjectReply();

        try {
            let result = await this._controller.getOrganizationByCode(correlationId, code);
            let organization = OrganizationsGrpcConverterV1.fromOrganization(result);
            if (result)
                response.setOrganization(organization);
        } catch (err) {
            let error = OrganizationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async generateCode(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();

        let response = new messages.OrganizationCodeReply();

        try {
            let code = await this._controller.generateCode(correlationId, orgId);
            response.setCode(code);
        } catch (err) {
            let error = OrganizationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }
    
    private async createOrganization(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let organization = OrganizationsGrpcConverterV1.toOrganization(call.request.getOrganization());

        let response = new messages.OrganizationObjectReply();

        try {
            let result = await this._controller.createOrganization(correlationId, organization);
            let organizationGrpcObj = OrganizationsGrpcConverterV1.fromOrganization(result);
            if (result)
                response.setOrganization(organizationGrpcObj);
        } catch (err) {
            let error = OrganizationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async updateOrganization(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let organization = OrganizationsGrpcConverterV1.toOrganization(call.request.getOrganization());

        let response = new messages.OrganizationObjectReply();

        try {
            let result = await this._controller.updateOrganization(correlationId, organization);
            let organizationGrpcObj = OrganizationsGrpcConverterV1.fromOrganization(result);
            if (result)
                response.setOrganization(organizationGrpcObj);
        } catch (err) {
            let error = OrganizationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async deleteOrganizationById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let orgId = call.request.getOrgId();

        let response = new messages.OrganizationObjectReply();

        try {
            let result = await this._controller.deleteOrganizationById(correlationId, orgId);
            let organizationGrpcObj = OrganizationsGrpcConverterV1.fromOrganization(result);
            if (result)
                response.setOrganization(organizationGrpcObj);
        } catch (err) {
            let error = OrganizationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    
        
    public register() {
        this.registerMethod(
            'get_organizations', 
            null,
            this.getOrganizations
        );

        this.registerMethod(
            'get_organization_by_id', 
            null,
            this.getOrganizationById
        );

        this.registerMethod(
            'get_organization_by_code', 
            null,
            this.getOrganizationByCode
        );

        this.registerMethod(
            'generate_code', 
            null,
            this.generateCode

        );

        this.registerMethod(
            'create_organization', 
            null,
            this.createOrganization
        );

        this.registerMethod(
            'update_organization', 
            null,
            this.updateOrganization
        );

        this.registerMethod(
            'delete_organization_by_id',
            null, 
            this.deleteOrganizationById
        );
    }
}
