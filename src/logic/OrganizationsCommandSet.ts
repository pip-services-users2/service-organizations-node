import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { OrganizationV1Schema } from '../data/version1/OrganizationV1Schema';
import { IOrganizationsController } from './IOrganizationsController';

export class OrganizationsCommandSet extends CommandSet {
    private _logic: IOrganizationsController;

    constructor(logic: IOrganizationsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetOrganizationsCommand());
		this.addCommand(this.makeGetOrganizationByIdCommand());
		this.addCommand(this.makeGetOrganizationByCodeCommand());
		this.addCommand(this.makeGenerateCodeCommand());
		this.addCommand(this.makeCreateOrganizationCommand());
		this.addCommand(this.makeUpdateOrganizationCommand());
		this.addCommand(this.makeDeleteOrganizationByIdCommand());
    }

	private makeGetOrganizationsCommand(): ICommand {
		return new Command(
			"get_organizations",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getOrganizations(correlationId, filter, paging);
            }
		);
	}

	private makeGetOrganizationByIdCommand(): ICommand {
		return new Command(
			"get_organization_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let org_id = args.getAsString("org_id");
				return await this._logic.getOrganizationById(correlationId, org_id);
            }
		);
	}

	private makeGetOrganizationByCodeCommand(): ICommand {
		return new Command(
			"get_organization_by_code",
			new ObjectSchema(true)
				.withRequiredProperty('code', TypeCode.String),
            async (correlationId: string, args: Parameters) => {
                let code = args.getAsString("code");
				return await this._logic.getOrganizationByCode(correlationId, code);
            }
		);
	}

	private makeGenerateCodeCommand(): ICommand {
		return new Command(
			"generate_code",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let org_id = args.getAsString("org_id");
				return await this._logic.generateCode(correlationId, org_id);
            }
		);
	}
	
	private makeCreateOrganizationCommand(): ICommand {
		return new Command(
			"create_organization",
			new ObjectSchema(true)
				.withRequiredProperty('organization', new OrganizationV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let organization = args.get("organization");
				return await this._logic.createOrganization(correlationId, organization);
            }
		);
	}

	private makeUpdateOrganizationCommand(): ICommand {
		return new Command(
			"update_organization",
			new ObjectSchema(true)
				.withRequiredProperty('organization', new OrganizationV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let organization = args.get("organization");
				return await this._logic.updateOrganization(correlationId, organization);
            }
		);
	}
	
	private makeDeleteOrganizationByIdCommand(): ICommand {
		return new Command(
			"delete_organization_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let orgId = args.getAsNullableString("org_id");
				return await this._logic.deleteOrganizationById(correlationId, orgId);
			}
		);
	}

}