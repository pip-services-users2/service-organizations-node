"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const OrganizationsServiceFactory_1 = require("../build/OrganizationsServiceFactory");
class OrganizationsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("organizations", "Organizations microservice");
        this._factories.add(new OrganizationsServiceFactory_1.OrganizationsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_mongodb_nodex_1.DefaultMongoDbFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.OrganizationsProcess = OrganizationsProcess;
//# sourceMappingURL=OrganizationsProcess.js.map