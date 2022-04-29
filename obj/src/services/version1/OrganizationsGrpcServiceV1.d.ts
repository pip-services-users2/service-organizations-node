import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class OrganizationsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getOrganizations;
    private getOrganizationById;
    private getOrganizationByCode;
    private generateCode;
    private createOrganization;
    private updateOrganization;
    private deleteOrganizationById;
    register(): void;
}
