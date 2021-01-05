import { NumberFormatStyle } from '@angular/common'
import { Stock_Office } from './stock_office.model'

export interface Stock{
    id: number
    code: NumberFormatStyle
    qr: string
    price: number
    name: string
    brand: string
    model: string
    unity:number
    unityRead:number
    count: number
    description: string
    image: string
    idOffice: number
    stock_Office: Stock_Office[]
}
export interface StockGet extends Stock{
    officeDescription: string;
}
