import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultMongoDbFactory } from 'pip-services3-mongodb-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { OrganizationsServiceFactory } from '../build/OrganizationsServiceFactory';

export class OrganizationsProcess extends ProcessContainer {

    public constructor() {
        super("organizations", "Organizations microservice");
        this._factories.add(new OrganizationsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultMongoDbFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
