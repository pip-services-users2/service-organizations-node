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
exports.OrganizationsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const OrganizationV1Schema_1 = require("../data/version1/OrganizationV1Schema");
class OrganizationsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetOrganizationsCommand());
        this.addCommand(this.makeGetOrganizationByIdCommand());
        this.addCommand(this.makeGetOrganizationByCodeCommand());
        this.addCommand(this.makeGenerateCodeCommand());
        this.addCommand(this.makeCreateOrganizationCommand());
        this.addCommand(this.makeUpdateOrganizationCommand());
        this.addCommand(this.makeDeleteOrganizationByIdCommand());
    }
    makeGetOrganizationsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_organizations", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getOrganizations(correlationId, filter, paging);
        }));
    }
    makeGetOrganizationByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_organization_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let org_id = args.getAsString("org_id");
            return yield this._logic.getOrganizationById(correlationId, org_id);
        }));
    }
    makeGetOrganizationByCodeCommand() {
        return new pip_services3_commons_nodex_2.Command("get_organization_by_code", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('code', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let code = args.getAsString("code");
            return yield this._logic.getOrganizationByCode(correlationId, code);
        }));
    }
    makeGenerateCodeCommand() {
        return new pip_services3_commons_nodex_2.Command("generate_code", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let org_id = args.getAsString("org_id");
            return yield this._logic.generateCode(correlationId, org_id);
        }));
    }
    makeCreateOrganizationCommand() {
        return new pip_services3_commons_nodex_2.Command("create_organization", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('organization', new OrganizationV1Schema_1.OrganizationV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let organization = args.get("organization");
            return yield this._logic.createOrganization(correlationId, organization);
        }));
    }
    makeUpdateOrganizationCommand() {
        return new pip_services3_commons_nodex_2.Command("update_organization", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('organization', new OrganizationV1Schema_1.OrganizationV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let organization = args.get("organization");
            return yield this._logic.updateOrganization(correlationId, organization);
        }));
    }
    makeDeleteOrganizationByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_organization_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let orgId = args.getAsNullableString("org_id");
            return yield this._logic.deleteOrganizationById(correlationId, orgId);
        }));
    }
}
exports.OrganizationsCommandSet = OrganizationsCommandSet;
//# sourceMappingURL=OrganizationsCommandSet.js.map