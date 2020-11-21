import { Articulo } from './Articulo'
import { Dispatc_stock } from './dispatch_stock.model'
import { Stock_Sucursal } from './stock_sucursal.model'

export class Dispatch{
    code: string
    origin: string
    destiny: string
    dateCreate: string
    dateDispatched: string
    dateRecived: string
    idState: string
    idUser: string
    unity: string
    stock: Articulo[]
    // tslint:disable-next-line: variable-name
    stock_sucursal: Stock_Sucursal[]
    // tslint:disable-next-line: variable-name
    dispatch_stock: Dispatc_stock[];
    stateText: string
}
