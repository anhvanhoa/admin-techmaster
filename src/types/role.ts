import { Role } from './global';

export type RoleReponse = {
    user_count: number;
    rule_count: number;
} & Role;
