import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { OrganizationV1 } from '../data/version1/OrganizationV1';
import { IOrganizationsPersistence } from './IOrganizationsPersistence';

export class OrganizationsMongoDbPersistence extends IdentifiableMongoDbPersistence<OrganizationV1, string> implements IOrganizationsPersistence {

    constructor() {
        super('organizations');
        this.ensureIndex({ code: 1 }, { unique: true });
    }

    private composeFilter(filter: FilterParams) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ description: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let code = filter.getAsNullableString('code');
        if (code != null) {
            code = code.toUpperCase();
            criteria.push({ code: code });
        }

        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (typeof ids == 'string')
            ids = ids.split(',');
        if (Array.isArray(ids))
            criteria.push({ _id: { $in: ids } });

        // Filter except ids
        let exceptIds = filter.getAsObject('except_ids');
        if (typeof exceptIds == 'string')
            exceptIds = exceptIds.split(',');
        if (Array.isArray(exceptIds))
            criteria.push({ _id: { $nin: exceptIds } });

        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        if (!deleted)
            criteria.push({ $or: [{ deleted: false }, { deleted: { $exists: false } }] });

        let fromTime = filter.getAsNullableDateTime('from_create_time');
        if (fromTime != null)
            criteria.push({ create_time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_create_time');
        if (toTime != null)
            criteria.push({ create_time: { $lt: toTime } });

        return criteria.length > 0 ? { $and: criteria } : null;
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<OrganizationV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
