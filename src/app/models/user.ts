import { RolesResolver } from '../resolvers/roles.resolver';
import { Item } from './item.model';

export interface User{
    userName: string
    password: string
    first_name: string
    last_name: string
    admissionDate: Date
    bornDate: Date
    email: string
    address: string
    postalCode: string
    idRole: number;
    idSucursal: number
    role: Item[];
}

export interface UserGet extends User{
    roleDescription: string;
    SucursalName: string;
}
