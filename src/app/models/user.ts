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
    idRole: number
    role: string
    idSucursal: number
    Role: Item[];
}

