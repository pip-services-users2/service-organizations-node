"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class OrganizationsCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/organizations');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-organizations', 'controller', 'default', '*', '*'));
    }
}
exports.OrganizationsCommandableGrpcServiceV1 = OrganizationsCommandableGrpcServiceV1;
//# sourceMappingURL=OrganizationsCommandableGrpcServiceV1.js.map