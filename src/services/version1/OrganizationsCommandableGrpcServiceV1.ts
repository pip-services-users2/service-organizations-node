import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class OrganizationsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/organizations');
        this._dependencyResolver.put('controller', new Descriptor('service-organizations', 'controller', 'default', '*', '*'));
    }
}