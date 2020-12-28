import { RolesResolver } from '../resolvers/roles.resolver';
import { Item } from './item.model';

export interface User{
    id?: number;
    userName: string
    password: string
    first_name: string
    last_name: string
    dateAdmission: Date
    dateBorn: Date
    email: string
    address: string
    postalCode: number
    idRole: number;
    idOffice: number;
    active: boolean;

   
}

export interface UserGet extends User{  
    role: Item[];
    roleDescription?: string;
    officeName?: string;
}

