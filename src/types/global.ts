export type Role = {
    id: number;
    name: string;
};

export type Bank = {
    bin: string;
    code: string;
    id: number;
    isTransfer: number;
    logo: string;
    lookupSupported: number;
    name: string;
    shortName: string;
    short_name: string;
    support: number;
    swift_code: string;
    transferSupported: number;
};

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
