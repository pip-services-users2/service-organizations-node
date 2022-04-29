import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { OrganizationV1 } from '../data/version1/OrganizationV1';
import { IOrganizationsPersistence } from './IOrganizationsPersistence';
export declare class OrganizationsMemoryPersistence extends IdentifiableMemoryPersistence<OrganizationV1, string> implements IOrganizationsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<OrganizationV1>>;
}
