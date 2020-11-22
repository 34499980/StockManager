import { NumberFormatStyle } from '@angular/common'
import { Stock_Sucursal } from './stock_sucursal.model'

export class Articulo{
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
    idsucursal: number
    stock_Sucursal: Stock_Sucursal[] = []
}
