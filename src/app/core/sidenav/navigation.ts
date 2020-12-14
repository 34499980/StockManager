import { PermissionType } from 'src/app/enums/navigation.enum';
import { Navigation } from 'src/app/models/navigation.model';

export const navigation: Navigation[] = [
    {
        id       : 'Administracion',
        title    : 'Administracion',
        translate: 'NAV.TICKET.TITLE',
        icon     : 'how_to_vote',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.Usuarios.toString(),
                title    : 'Usuarios',
                translate: 'Usuarios',
                hidden   : false,
                type     : 'item',
                icon     : 'inbox',
                url      : '/Profile/all',
            },
            {
                id       : PermissionType.Perfil.toString(),
                title    : 'Perfil',
                translate: 'Perfil',
                hidden   : false,
                type     : 'item',
                icon     : 'how_to_vote',
                url      : '/Profile',
            },
            ,
            {
                id       : PermissionType.Anulaciones.toString(),
                title    : 'Anulaciones',
                translate: 'Anulaciones',
                hidden   : false,
                type     : 'item',
                icon     : 'how_to_vote',
                url      : '/Anulaciones',
            },
        ]
    },
    {
        id       : 'Sucursales',
        title    : 'Sucursales',
        translate: 'Sucursales',
        icon     : 'admin_panel_settings',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.Movimientos.toString(),
                title    : 'Movimientos',
                translate: 'Movimientos',
                hidden   : false,
                type     : 'item',
                icon     : 'business_center',
                url      : '/Movimientos',
            },
            {
                id       : PermissionType.Ventas.toString(),
                title    : 'Ventas',
                translate: 'Ventas',
                hidden   : false,
                type     : 'item',
                icon     : 'supervisor_account',
                url      : '/Ventas',
            },
            {
                id       : PermissionType.Anular.toString(),
                title    : 'Anular',
                translate: 'Anular',
                hidden   : false,
                type     : 'item',
                icon     : 'business_center',
                url      : '/Anular',
            },
            {
                id       : PermissionType.Devolucion.toString(),
                title    : 'Devolución',
                translate: 'Ventas',
                hidden   : false,
                type     : 'item',
                icon     : 'supervisor_account',
                url      : '/Devolución',
            }
        ]
    },
    {
        id       : 'Mercaderia',
        title    : 'Mercaderia',
        translate: 'Mercaderia',
        icon     : 'admin_panel_settings',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.Stock.toString(),
                title    : 'Stock',
                translate: 'Stock',
                hidden   : false,
                type     : 'item',
                icon     : 'business_center',
                url      : '/Stock',
            },
            {
                id       : PermissionType.Despachos.toString(),
                title    : 'Despachos',
                translate: 'Despachos',
                hidden   : false,
                type     : 'item',
                icon     : 'supervisor_account',
                url      : '/Despachos',
            }
        ]
    },
];
