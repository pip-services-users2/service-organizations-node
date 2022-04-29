import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { OrganizationsMemoryPersistence } from './OrganizationsMemoryPersistence';
import { OrganizationV1 } from '../data/version1/OrganizationV1';

export class OrganizationsFilePersistence extends OrganizationsMemoryPersistence {
	protected _persister: JsonFilePersister<OrganizationV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<OrganizationV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}