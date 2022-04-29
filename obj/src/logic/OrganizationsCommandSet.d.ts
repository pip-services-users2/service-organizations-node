import { CommandSet } from 'pip-services3-commons-nodex';
import { IOrganizationsController } from './IOrganizationsController';
export declare class OrganizationsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IOrganizationsController);
    private makeGetOrganizationsCommand;
    private makeGetOrganizationByIdCommand;
    private makeGetOrganizationByCodeCommand;
    private makeGenerateCodeCommand;
    private makeCreateOrganizationCommand;
    private makeUpdateOrganizationCommand;
    private makeDeleteOrganizationByIdCommand;
}
