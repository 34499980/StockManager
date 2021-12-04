import { User } from "./user";

export interface History{
    id: number;
    dateProces: string;  
    idUser: number;
    user: User;
    userName: string;
    idOffice: number;
    officeName: string;
    subAction: string;
    actionDetail: string;   
}