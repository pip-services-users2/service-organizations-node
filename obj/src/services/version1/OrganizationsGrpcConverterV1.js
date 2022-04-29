"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsGrpcConverterV1 = void 0;
const messages = require('../../../../src/protos/organizations_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
class OrganizationsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_4.ErrorDescriptionFactory.create(err);
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
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: OrganizationsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_5.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject == 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }
    static getMap(map) {
        let values = {};
        OrganizationsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromOrganization(organization) {
        if (organization == null)
            return null;
        let obj = new messages.Organization();
        obj.setId(organization.id);
        obj.setCode(organization.code);
        obj.setCreateTime(pip_services3_commons_nodex_2.StringConverter.toString(organization.create_time));
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
    static toOrganization(obj) {
        if (obj == null)
            return null;
        let organization = {
            id: obj.getId(),
            code: obj.getCode(),
            create_time: pip_services3_commons_nodex_3.DateTimeConverter.toDateTime(obj.getCreateTime()),
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
    static fromOrganizationPage(page) {
        if (page == null)
            return null;
        let obj = new messages.OrganizationPage();
        obj.setTotal(page.total);
        let data = page.data.map(OrganizationsGrpcConverterV1.fromOrganization);
        obj.setDataList(data);
        return obj;
    }
    static toOrganizationPage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(OrganizationsGrpcConverterV1.toOrganization);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.OrganizationsGrpcConverterV1 = OrganizationsGrpcConverterV1;
//# sourceMappingURL=OrganizationsGrpcConverterV1.js.map