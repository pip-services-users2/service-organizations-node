"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/organizations_v1_grpc_pb');
const messages = require('../../../../src/protos/organizations_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const OrganizationsGrpcConverterV1_1 = require("./OrganizationsGrpcConverterV1");
class OrganizationsGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.OrganizationsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-organizations", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getOrganizations(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.OrganizationPageReply();
            try {
                let result = yield this._controller.getOrganizations(correlationId, filter, paging);
                let page = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromOrganizationPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getOrganizationById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let response = new messages.OrganizationObjectReply();
            try {
                let result = yield this._controller.getOrganizationById(correlationId, orgId);
                let organization = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromOrganization(result);
                response.setOrganization(organization);
            }
            catch (err) {
                let error = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getOrganizationByCode(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let code = call.request.getCode();
            let response = new messages.OrganizationObjectReply();
            try {
                let result = yield this._controller.getOrganizationByCode(correlationId, code);
                let organization = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromOrganization(result);
                if (result)
                    response.setOrganization(organization);
            }
            catch (err) {
                let error = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    generateCode(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let response = new messages.OrganizationCodeReply();
            try {
                let code = yield this._controller.generateCode(correlationId, orgId);
                response.setCode(code);
            }
            catch (err) {
                let error = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    createOrganization(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let organization = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.toOrganization(call.request.getOrganization());
            let response = new messages.OrganizationObjectReply();
            try {
                let result = yield this._controller.createOrganization(correlationId, organization);
                let organizationGrpcObj = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromOrganization(result);
                if (result)
                    response.setOrganization(organizationGrpcObj);
            }
            catch (err) {
                let error = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    updateOrganization(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let organization = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.toOrganization(call.request.getOrganization());
            let response = new messages.OrganizationObjectReply();
            try {
                let result = yield this._controller.updateOrganization(correlationId, organization);
                let organizationGrpcObj = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromOrganization(result);
                if (result)
                    response.setOrganization(organizationGrpcObj);
            }
            catch (err) {
                let error = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    deleteOrganizationById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let orgId = call.request.getOrgId();
            let response = new messages.OrganizationObjectReply();
            try {
                let result = yield this._controller.deleteOrganizationById(correlationId, orgId);
                let organizationGrpcObj = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromOrganization(result);
                if (result)
                    response.setOrganization(organizationGrpcObj);
            }
            catch (err) {
                let error = OrganizationsGrpcConverterV1_1.OrganizationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_organizations', null, this.getOrganizations);
        this.registerMethod('get_organization_by_id', null, this.getOrganizationById);
        this.registerMethod('get_organization_by_code', null, this.getOrganizationByCode);
        this.registerMethod('generate_code', null, this.generateCode);
        this.registerMethod('create_organization', null, this.createOrganization);
        this.registerMethod('update_organization', null, this.updateOrganization);
        this.registerMethod('delete_organization_by_id', null, this.deleteOrganizationById);
    }
}
exports.OrganizationsGrpcServiceV1 = OrganizationsGrpcServiceV1;
//# sourceMappingURL=OrganizationsGrpcServiceV1.js.map