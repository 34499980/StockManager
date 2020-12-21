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
    idSucursal: number

   
}

export interface UserGet extends User{  
    role: Item[];
    roleDescription?: string;
    sucursalName?: string;
}

