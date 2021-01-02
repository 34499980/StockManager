export interface Office {
    id: number;
    name: string;
    address: string;
    postalCode: number;
    active: boolean;
}
export interface OfficeGet extends Office{  
    countryDescription?: string;
}

