import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { OrganizationV1 } from '../data/version1/OrganizationV1';
import { IOrganizationsPersistence } from './IOrganizationsPersistence';

export class OrganizationsMemoryPersistence
    extends IdentifiableMemoryPersistence<OrganizationV1, string>
    implements IOrganizationsPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: OrganizationV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.description, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;

        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }

        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let code = filter.getAsNullableString('code');
        let name = filter.getAsNullableString('name');
        let ids = filter.getAsObject('ids');
        let exceptIds = filter.getAsObject('except_ids');
        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');

        // Process code
        if (code)
            code = code.toUpperCase();

        // Process ids filter
        if (typeof ids == 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;

        // Process except ids filter
        if (typeof exceptIds == 'string')
            exceptIds = exceptIds.split(',');
        if (!Array.isArray(exceptIds))
            exceptIds = null;
        
        return (item) => {
            if (id && item.id != id)
                return false;
            if (code && item.code != code)
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            if (exceptIds && exceptIds.indexOf(item.id) >= 0)
                return false;
            if (name && item.name != name)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            if (!deleted && item.deleted)
                return false;
            if (fromCreateTime != null && item.create_time >= fromCreateTime)
                return false;
            if (toCreateTime != null && item.create_time < toCreateTime)
                return false;
            return true;
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<OrganizationV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
