import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { OrganizationsMemoryPersistence } from './OrganizationsMemoryPersistence';
import { OrganizationV1 } from '../data/version1/OrganizationV1';
export declare class OrganizationsFilePersistence extends OrganizationsMemoryPersistence {
    protected _persister: JsonFilePersister<OrganizationV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
