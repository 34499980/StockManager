import { NumberFormatStyle } from '@angular/common'
import { SafeResourceUrl, SafeValue } from '@angular/platform-browser'
import { Stock_Office } from './stock_office.model'

export interface Stock{
    id: number
    code: NumberFormatStyle
    qr?: string
    price?: number
    name: string
    brand: string
    model: string  
    description: string
    file?: File
    idOffice: number
    stock_Office?: Stock_Office[]
}
export interface StockGet extends Stock{
    officeDescription: string;
    idCountry: number;
}
export interface StockPost extends Stock{   
    idCountry: number;  
}
