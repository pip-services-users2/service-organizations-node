import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class OrganizationsCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/organizations');
        this._dependencyResolver.put('controller', new Descriptor('service-organizations', 'controller', 'default', '*', '1.0'));
    }
}