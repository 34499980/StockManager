import { Articulo } from './Articulo'
import { Dispatc_stock } from './dispatch_stock.model'
import { Stock_Office } from './stock_office.model'

export interface Dispatch{
    code: string
    origin: number
    destiny: number
    dateCreate: string
    dateDispatched: string
    dateRecived: string
    idState: number
    idUser: number
    unity: string
    stock: Articulo[]
    // tslint:disable-next-line: variable-name
    stock_office: Stock_Office[]
    // tslint:disable-next-line: variable-name
    dispatch_stock: Dispatc_stock[];
    stateText: string
}
