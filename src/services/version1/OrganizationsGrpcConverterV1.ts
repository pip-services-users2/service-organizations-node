const messages = require('../../../../src/protos/organizations_v1_pb');

import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { StringConverter } from 'pip-services3-commons-nodex';
import { DateTimeConverter } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { OrganizationV1 } from '../../data/version1/OrganizationV1';

export class OrganizationsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        OrganizationsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: OrganizationsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject == 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        OrganizationsGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromOrganization(organization: OrganizationV1): any {
        if (organization == null) return null;

        let obj = new messages.Organization();

        obj.setId(organization.id);
        obj.setCode(organization.code);
        obj.setCreateTime(StringConverter.toString(organization.create_time))
        obj.setCreatorId(organization.creator_id);
        obj.setDeleted(organization.deleted);
        obj.setActive(organization.active);
        obj.setVersion(organization.version);

        obj.setName(organization.name);
        obj.setDescription(organization.description);
        obj.setAddress(organization.address);

        obj.setCenter(OrganizationsGrpcConverterV1.toJson(organization.center));
        obj.setRadius(organization.radius);
        obj.setGeometry(OrganizationsGrpcConverterV1.toJson(organization.geometry));
        obj.setBoundaries(OrganizationsGrpcConverterV1.toJson(organization.boundaries));
        
        obj.setLanguage(organization.language);
        obj.setTimezone(organization.timezone);
        obj.setIndustry(organization.industry);
        obj.setOrgSize(organization.org_size);
        obj.setPurpose(organization.purpose);

        obj.setParams(OrganizationsGrpcConverterV1.toJson(organization.params));
    
        return obj;
    }

    public static toOrganization(obj: any): OrganizationV1 {
        if (obj == null) return null;

        let organization: any = { //OrganizationV1 = {
            id: obj.getId(),
            code: obj.getCode(),
            create_time: DateTimeConverter.toDateTime(obj.getCreateTime()),
            creator_id: obj.getCreatorId(),
            deleted: obj.getDeleted(),
            active: obj.getActive(),
            version: obj.getVersion(),

            name: obj.getName(),
            description: obj.getDescription(),
            address: obj.getAddress(),

            center: OrganizationsGrpcConverterV1.fromJson(obj.getCenter()),
            radius: obj.getRadius(),
            geometry: OrganizationsGrpcConverterV1.fromJson(obj.getGeometry()),
            boundaries: OrganizationsGrpcConverterV1.fromJson(obj.getBoundaries()),

            language: obj.getLanguage(),
            timezone: obj.getTimezone(),
            industry: obj.getIndustry(),
            org_size: obj.getOrgSize(),
            purpose: obj.getPurpose(),

            params: OrganizationsGrpcConverterV1.fromJson(obj.getParams())
        };
    
        return organization;
    }

    public static fromOrganizationPage(page: DataPage<OrganizationV1>): any {
        if (page == null) return null;

        let obj = new messages.OrganizationPage();

        obj.setTotal(page.total);
        let data = page.data.map(OrganizationsGrpcConverterV1.fromOrganization);
        obj.setDataList(data);

        return obj;
    }

    public static toOrganizationPage(obj: any): DataPage<OrganizationV1> {
        if (obj == null) return null;

        let data = obj.getDataList().map(OrganizationsGrpcConverterV1.toOrganization);
        let page: DataPage<OrganizationV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}