"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const OrganizationsMemoryPersistence_1 = require("./OrganizationsMemoryPersistence");
class OrganizationsFilePersistence extends OrganizationsMemoryPersistence_1.OrganizationsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.OrganizationsFilePersistence = OrganizationsFilePersistence;
//# sourceMappingURL=OrganizationsFilePersistence.js.map