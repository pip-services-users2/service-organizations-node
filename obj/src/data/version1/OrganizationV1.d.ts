import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class OrganizationV1 implements IStringIdentifiable {
    id: string;
    code?: string;
    create_time: Date;
    creator_id: string;
    deleted?: boolean;
    active: boolean;
    version?: number;
    name: string;
    description?: string;
    address?: string;
    center?: any;
    radius?: number;
    geometry?: any;
    boundaries?: any;
    language?: string;
    timezone?: string;
    industry?: string;
    org_size?: number;
    purpose?: string;
    params?: any;
}
