"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class OrganizationsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/organizations');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-organizations', 'controller', 'default', '*', '1.0'));
    }
}
exports.OrganizationsHttpServiceV1 = OrganizationsHttpServiceV1;
//# sourceMappingURL=OrganizationsHttpServiceV1.js.map