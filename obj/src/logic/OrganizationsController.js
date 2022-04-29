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
exports.OrganizationsController = void 0;
const geojson = require('geojson-utils');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const OrganizationsCommandSet_1 = require("./OrganizationsCommandSet");
class OrganizationsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(OrganizationsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new OrganizationsCommandSet_1.OrganizationsCommandSet(this);
        return this._commandSet;
    }
    getOrganizations(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getOrganizationById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    getOrganizationByCode(correlationId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromTuples('code', code, 'deleted', false);
            let page = yield this._persistence.getPageByFilter(correlationId, filter, null);
            let organization = page && page.data.length > 0 ? page.data[0] : null;
            return organization;
        });
    }
    calculateBoundaries(geometry) {
        let coords = geometry.coordinates;
        let xAll = [], yAll = [];
        for (let i = 0; i < coords[0].length; i++) {
            xAll.push(coords[0][i][0]);
            yAll.push(coords[0][i][1]);
        }
        xAll = xAll.sort(function (a, b) { return a - b; });
        yAll = yAll.sort(function (a, b) { return a - b; });
        return {
            type: "Polygon",
            coordinates: [[xAll[0], yAll[0]], [xAll[xAll.length - 1], yAll[yAll.length - 1]]]
        };
    }
    calculateGeometry(organization) {
        if (organization.center) {
            organization.geometry = geojson.drawCircle(organization.radius * 1000, organization.center, 10);
            organization.boundaries = this.calculateBoundaries(organization.geometry);
        }
        else if (organization.geometry) {
            organization.center = geojson.centroid(organization.geometry);
            organization.boundaries = this.calculateBoundaries(organization.geometry);
        }
    }
    fixOrganization(organization) {
        if (typeof organization.center == 'string')
            organization.center = JSON.parse(organization.center);
        if (typeof organization.geometry == 'string')
            organization.geometry = JSON.parse(organization.geometry);
        organization.code = organization.code ? organization.code.toUpperCase() : null;
        organization.radius = organization.radius || 10;
    }
    generateRandomCode(organization) {
        if (organization.name) {
            return organization.name.replace(/\W/g, '').toUpperCase().substr(0, 5)
                + Math.round(10 + Math.random() * 89).toString();
        }
        else {
            return Math.round(100000 + Math.random() * 899999).toString();
        }
    }
    validateOrGenerateCode(correlationId, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check provided code
            if (organization.code != null) {
                let data = yield this.getOrganizationByCode(correlationId, organization.code);
                if (data != null) {
                    throw new pip_services3_commons_nodex_7.BadRequestException(correlationId, 'ORGANIZATION_CODE_USED', 'Organization code ' + organization.code + ' has already been used').withDetails('code', organization.code);
                }
            }
            // Generate and check a random code
            else {
                do {
                    organization.code = this.generateRandomCode(organization);
                    let data = yield this.getOrganizationByCode(correlationId, organization.code);
                    if (data)
                        organization.code = null;
                } while (organization.code == null);
            }
        });
    }
    generateCode(correlationId, orgId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldOrganization = null;
            let code = null;
            oldOrganization = yield this._persistence.getOneById(correlationId, orgId);
            if (oldOrganization == null) {
                throw new pip_services3_commons_nodex_6.NotFoundException(correlationId, 'ORGANIZATION_NOT_FOUND', 'Organization ' + orgId + ' was not found').withDetails('org_id', orgId);
            }
            do {
                code = this.generateRandomCode(oldOrganization);
                let data = yield this.getOrganizationByCode(correlationId, code);
                if (data)
                    code = null;
            } while (code == null);
            return code;
        });
    }
    createOrganization(correlationId, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            let newOrganization;
            organization.id = organization.id || pip_services3_commons_nodex_4.IdGenerator.nextLong();
            organization.create_time = organization.create_time || new Date();
            organization.active = organization.active != null ? organization.active : true;
            organization.version = pip_services3_commons_nodex_5.RandomInteger.nextInteger(1, 255);
            this.fixOrganization(organization);
            this.calculateGeometry(organization);
            // Validate or generate code
            yield this.validateOrGenerateCode(correlationId, organization);
            // Create organization
            newOrganization = yield this._persistence.create(correlationId, organization);
            return newOrganization;
        });
    }
    updateOrganization(correlationId, organization) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldOrganization = null;
            let newOrganization = null;
            this.fixOrganization(organization);
            this.calculateGeometry(organization);
            oldOrganization = yield this._persistence.getOneById(correlationId, organization.id);
            if (oldOrganization == null) {
                throw new pip_services3_commons_nodex_6.NotFoundException(correlationId, 'ORGANIZATION_NOT_FOUND', 'Organization ' + organization.id + ' was not found').withDetails('org_id', organization.id);
            }
            if (organization.code == null || organization.code != oldOrganization.code)
                yield this.validateOrGenerateCode(correlationId, organization);
            organization.version = oldOrganization.version && oldOrganization.version < 255 ? oldOrganization.version + 1 : 1;
            newOrganization = yield this._persistence.update(correlationId, organization);
            return newOrganization;
        });
    }
    deleteOrganizationById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldOrganization = null;
            let newOrganization;
            // Todo: Implement logical deletion
            // Get organization
            oldOrganization = yield this._persistence.getOneById(correlationId, id);
            // Set logical deletion flag
            if (oldOrganization == null) {
                return;
            }
            newOrganization = Object.assign({}, oldOrganization);
            newOrganization.deleted = true;
            newOrganization = yield this._persistence.update(correlationId, newOrganization);
            // oldOrganization = await this._persistence.deleteById(correlationId, id);
            return newOrganization;
        });
    }
}
exports.OrganizationsController = OrganizationsController;
OrganizationsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-organizations:persistence:*:*:1.0');
//# sourceMappingURL=OrganizationsController.js.map