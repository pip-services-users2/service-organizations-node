import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { OrganizationV1 } from '../../data/version1/OrganizationV1';
export declare class OrganizationsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromOrganization(organization: OrganizationV1): any;
    static toOrganization(obj: any): OrganizationV1;
    static fromOrganizationPage(page: DataPage<OrganizationV1>): any;
    static toOrganizationPage(obj: any): DataPage<OrganizationV1>;
}
