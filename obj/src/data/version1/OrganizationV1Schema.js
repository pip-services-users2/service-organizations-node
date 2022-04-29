"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class OrganizationV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_nodex_2.TypeCode.DateTime);
        this.withOptionalProperty('creator_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('deleted', pip_services3_commons_nodex_2.TypeCode.Boolean);
        this.withRequiredProperty('active', pip_services3_commons_nodex_2.TypeCode.Boolean);
        this.withOptionalProperty('code', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('version', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('description', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('address', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('center', null); //TypeCode.Object);
        this.withOptionalProperty('radius', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('geometry', null); //TypeCode.Object);
        this.withOptionalProperty('boundaries', null); //TypeCode.Object);
        this.withOptionalProperty('language', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('timezone', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('industry', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('org_size', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withOptionalProperty('purpose', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('params', null); //TypeCode.Object);        
    }
}
exports.OrganizationV1Schema = OrganizationV1Schema;
//# sourceMappingURL=OrganizationV1Schema.js.map