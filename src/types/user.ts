import { Role } from './global';

export type IUser = {
    id: string;
    full_name: string;
    avatar: string;
    bank_account: string;
    bank_code: string;
    bank_name: string;
    description: string;
    email: string;
    has_password: boolean;
    link_cv: string;
    new_email: string;
    phone: string;
    roles: Role[];
};
