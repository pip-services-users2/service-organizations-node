import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class OrganizationV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('creator_id', TypeCode.String);
        this.withOptionalProperty('deleted', TypeCode.Boolean);
        this.withRequiredProperty('active', TypeCode.Boolean);

        this.withOptionalProperty('code', TypeCode.String);
        this.withOptionalProperty('version', TypeCode.Integer);

        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('description', TypeCode.String);
        this.withOptionalProperty('address', TypeCode.String);
        
        this.withOptionalProperty('center', null); //TypeCode.Object);
        this.withOptionalProperty('radius', TypeCode.Integer);
        this.withOptionalProperty('geometry', null); //TypeCode.Object);
        this.withOptionalProperty('boundaries', null); //TypeCode.Object);

        this.withOptionalProperty('language', TypeCode.String);
        this.withOptionalProperty('timezone', TypeCode.String);
        this.withOptionalProperty('industry', TypeCode.String);
        this.withOptionalProperty('org_size', TypeCode.Integer);
        this.withOptionalProperty('purpose', TypeCode.String);

        this.withOptionalProperty('params', null); //TypeCode.Object);        
    }
}

