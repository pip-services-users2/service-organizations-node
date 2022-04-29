"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.OrganizationsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const OrganizationsServiceFactory_1 = require("../build/OrganizationsServiceFactory");
class OrganizationsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("organizations", "Organizations function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-organizations', 'controller', 'default', '*', '*'));
        this._factories.add(new OrganizationsServiceFactory_1.OrganizationsServiceFactory());
    }
}
exports.OrganizationsLambdaFunction = OrganizationsLambdaFunction;
exports.handler = new OrganizationsLambdaFunction().getHandler();
//# sourceMappingURL=OrganizationsLambdaFunction.js.map