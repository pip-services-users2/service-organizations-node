import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { OrganizationsMongoDbPersistence } from '../persistence/OrganizationsMongoDbPersistence';
import { OrganizationsFilePersistence } from '../persistence/OrganizationsFilePersistence';
import { OrganizationsMemoryPersistence } from '../persistence/OrganizationsMemoryPersistence';
import { OrganizationsController } from '../logic/OrganizationsController';
import { OrganizationsCommandableHttpServiceV1 } from '../services/version1/OrganizationsCommandableHttpServiceV1';
import { OrganizationsCommandableGrpcServiceV1 } from '../services/version1/OrganizationsCommandableGrpcServiceV1';
import { OrganizationsGrpcServiceV1 } from '../services/version1/OrganizationsGrpcServiceV1';

export class OrganizationsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-organizations", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-organizations", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-organizations", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-organizations", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-organizations", "controller", "default", "*", "1.0");
	public static CmdHttpServiceDescriptor = new Descriptor("service-organizations", "service", "commandable-http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-organizations", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-organizations", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(OrganizationsServiceFactory.MemoryPersistenceDescriptor, OrganizationsMemoryPersistence);
		this.registerAsType(OrganizationsServiceFactory.FilePersistenceDescriptor, OrganizationsFilePersistence);
		this.registerAsType(OrganizationsServiceFactory.MongoDbPersistenceDescriptor, OrganizationsMongoDbPersistence);
		this.registerAsType(OrganizationsServiceFactory.ControllerDescriptor, OrganizationsController);
		this.registerAsType(OrganizationsServiceFactory.CmdHttpServiceDescriptor, OrganizationsCommandableHttpServiceV1);
		this.registerAsType(OrganizationsServiceFactory.CommandableGrpcServiceDescriptor, OrganizationsCommandableGrpcServiceV1);
		this.registerAsType(OrganizationsServiceFactory.GrpcServiceDescriptor, OrganizationsGrpcServiceV1);
	}
	
}
