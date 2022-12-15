"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const OrganizationsMongoDbPersistence_1 = require("../persistence/OrganizationsMongoDbPersistence");
const OrganizationsFilePersistence_1 = require("../persistence/OrganizationsFilePersistence");
const OrganizationsMemoryPersistence_1 = require("../persistence/OrganizationsMemoryPersistence");
const OrganizationsController_1 = require("../logic/OrganizationsController");
const OrganizationsCommandableHttpServiceV1_1 = require("../services/version1/OrganizationsCommandableHttpServiceV1");
const OrganizationsCommandableGrpcServiceV1_1 = require("../services/version1/OrganizationsCommandableGrpcServiceV1");
const OrganizationsGrpcServiceV1_1 = require("../services/version1/OrganizationsGrpcServiceV1");
class OrganizationsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(OrganizationsServiceFactory.MemoryPersistenceDescriptor, OrganizationsMemoryPersistence_1.OrganizationsMemoryPersistence);
        this.registerAsType(OrganizationsServiceFactory.FilePersistenceDescriptor, OrganizationsFilePersistence_1.OrganizationsFilePersistence);
        this.registerAsType(OrganizationsServiceFactory.MongoDbPersistenceDescriptor, OrganizationsMongoDbPersistence_1.OrganizationsMongoDbPersistence);
        this.registerAsType(OrganizationsServiceFactory.ControllerDescriptor, OrganizationsController_1.OrganizationsController);
        this.registerAsType(OrganizationsServiceFactory.CmdHttpServiceDescriptor, OrganizationsCommandableHttpServiceV1_1.OrganizationsCommandableHttpServiceV1);
        this.registerAsType(OrganizationsServiceFactory.CommandableGrpcServiceDescriptor, OrganizationsCommandableGrpcServiceV1_1.OrganizationsCommandableGrpcServiceV1);
        this.registerAsType(OrganizationsServiceFactory.GrpcServiceDescriptor, OrganizationsGrpcServiceV1_1.OrganizationsGrpcServiceV1);
    }
}
exports.OrganizationsServiceFactory = OrganizationsServiceFactory;
OrganizationsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "factory", "default", "default", "1.0");
OrganizationsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "persistence", "memory", "*", "1.0");
OrganizationsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "persistence", "file", "*", "1.0");
OrganizationsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "persistence", "mongodb", "*", "1.0");
OrganizationsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "controller", "default", "*", "1.0");
OrganizationsServiceFactory.CmdHttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "service", "commandable-http", "*", "1.0");
OrganizationsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "service", "commandable-grpc", "*", "1.0");
OrganizationsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-organizations", "service", "grpc", "*", "1.0");
//# sourceMappingURL=OrganizationsServiceFactory.js.map