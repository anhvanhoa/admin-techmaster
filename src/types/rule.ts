import { Role } from './global';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type AccessType = 'allow' | 'forbid' | 'allow_all' | 'forbid_all';

export type RuleByRole = {
    id: number;
    path: string;
    method: Method;
    isPrivate: boolean;
    name: string;
    accessType: AccessType;
    service: string;
    roles: Role[];
};

export type RuleUser = {
    id: string;
    path: string;
    service: string;
    method: Method;
    isPrivate: boolean;
};
