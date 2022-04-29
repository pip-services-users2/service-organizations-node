import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { OrganizationsServiceFactory } from '../build/OrganizationsServiceFactory';

export class OrganizationsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("organizations", "Organizations function");
        this._dependencyResolver.put('controller', new Descriptor('service-organizations', 'controller', 'default', '*', '*'));
        this._factories.add(new OrganizationsServiceFactory());
    }
}

export const handler = new OrganizationsLambdaFunction().getHandler();