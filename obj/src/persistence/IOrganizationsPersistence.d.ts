import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';
import { OrganizationV1 } from '../data/version1/OrganizationV1';
export interface IOrganizationsPersistence extends IGetter<OrganizationV1, string>, IWriter<OrganizationV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<OrganizationV1>>;
    getOneById(correlationId: string, id: string): Promise<OrganizationV1>;
    create(correlationId: string, item: OrganizationV1): Promise<OrganizationV1>;
    update(correlationId: string, item: OrganizationV1): Promise<OrganizationV1>;
    deleteById(correlationId: string, id: string): Promise<OrganizationV1>;
}
