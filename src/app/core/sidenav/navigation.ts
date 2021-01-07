import { PermissionType } from 'src/app/enums/navigation.enum';
import { Navigation } from 'src/app/models/navigation.model';

export const navigation: Navigation[] = [
    {
        id       : 'Administracion',
        title    : 'ADMINISTRATION',
        translate: 'NAV.ADMINISTRATION.TITLE',
        icon     : 'how_to_vote',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.Usuarios.toString(),
                title    : 'USERS',
                translate: 'NAV.ADMINISTRATION.SUBTITLES.USERS',
                hidden   : false,
                type     : 'item',
                icon     : 'inbox',
                url      : '/Profile/all',
            },
            {
                id       : PermissionType.Perfil.toString(),
                title    : 'PROFILE',
                translate: 'NAV.ADMINISTRATION.SUBTITLES.PROFILE',
                hidden   : false,
                type     : 'item',
                icon     : 'how_to_vote',
                url      : '/Profile',
            },
            ,
            {
                id       : PermissionType.Anulaciones.toString(),
                title    : 'ANNULMENT',
                translate: 'NAV.ADMINISTRATION.SUBTITLES.ANNULMENT',
                hidden   : false,
                type     : 'item',
                icon     : 'how_to_vote',
                url      : '/Anulaciones',
            },
        ]
    },
    {
        id       : 'OFFICE',
        title    : 'OFFICE',
        translate: 'NAV.OFFICE.TITLE',
        icon     : 'admin_panel_settings',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.Office.toString(),
                title    : 'ADDOFFICE',
                translate: 'NAV.OFFICE.SUBTITLES.ADDOFFICE',
                hidden   : false,
                type     : 'item',
                icon     : 'business_center',
                url      : '/Office',
            },
            {
                id       : PermissionType.OfficeList.toString(),
                title    : 'OFFICELIST',
                translate: 'NAV.OFFICE.SUBTITLES.OFFICELIST',
                hidden   : false,
                type     : 'item',
                icon     : 'business_center',
                url      : '/Office/all',
            },
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
        id       : 'Stock',
        title    : 'STOCK',
        translate: 'NAV.STOCK.TITLE',
        icon     : 'admin_panel_settings',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.Stock.toString(),
                title    : 'STOCKLIST',
                translate:  'NAV.STOCK.SUBTITLES.STOCKLIST',
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
