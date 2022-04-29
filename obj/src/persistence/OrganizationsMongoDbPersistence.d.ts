import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { OrganizationV1 } from '../data/version1/OrganizationV1';
import { IOrganizationsPersistence } from './IOrganizationsPersistence';
export declare class OrganizationsMongoDbPersistence extends IdentifiableMongoDbPersistence<OrganizationV1, string> implements IOrganizationsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<OrganizationV1>>;
}
