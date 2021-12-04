import { PermissionType } from 'src/app/enums/navigation.enum';
import { Navigation } from 'src/app/models/navigation.model';

export const navigation: Navigation[] = [
    {
        id       : PermissionType.Administration.toString(),
        title    : 'ADMINISTRATION',
        translate: 'NAV.ADMINISTRATION.TITLE',
        icon     : 'how_to_vote',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.UserList.toString(),
                title    : 'USERS',
                translate: 'NAV.ADMINISTRATION.SUBTITLES.USERS',
                hidden   : false,
                type     : 'item',
                icon     : 'inbox',
                url      : '/Profile/all',
            },
            {
                id       : PermissionType.Profile.toString(),
                title    : 'PROFILE',
                translate: 'NAV.ADMINISTRATION.SUBTITLES.PROFILE',
                hidden   : false,
                type     : 'item',
                icon     : 'how_to_vote',
                url      : '/Profile',
            },            
            {
                id       : PermissionType.Annulment.toString(),
                title    : 'ANNULMENT',
                translate: 'NAV.ADMINISTRATION.SUBTITLES.ANNULMENT',
                hidden   : false,
                type     : 'item',
                icon     : 'how_to_vote',
                url      : '/Anulaciones',
            },
            ,            
            {
                id       : PermissionType.History.toString(),
                title    : 'HISTORY',
                translate: 'NAV.ADMINISTRATION.SUBTITLES.HISTORY',
                hidden   : false,
                type     : 'item',
                icon     : 'how_to_vote',
                url      : '/History',
            },
        ]
    },
    {
        id       : PermissionType.Offices.toString(),
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
                id       : PermissionType.Sales.toString(),
                title    : 'Ventas',
                translate: 'Ventas',
                hidden   : false,
                type     : 'item',
                icon     : 'supervisor_account',
                url      : '/Ventas',
            },
            {
                id       : PermissionType.Cancel.toString(),
                title    : 'Anular',
                translate: 'Anular',
                hidden   : false,
                type     : 'item',
                icon     : 'business_center',
                url      : '/Anular',
            },
            {
                id       : PermissionType.Return.toString(),
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
        id       : PermissionType.Stock.toString(),
        title    : 'STOCK',
        translate: 'NAV.STOCK.TITLE',
        icon     : 'admin_panel_settings',
        type     : 'collapsable',
        children : [
            {
                id       : PermissionType.Items.toString(),
                title    : 'STOCKLIST',
                translate:  'NAV.STOCK.SUBTITLES.STOCKLIST',
                hidden   : false,
                type     : 'item',
                icon     : 'business_center',
                url      : '/Stock',
            },
            {
                id       : PermissionType.DispatchList.toString(),
                title    : 'DISPATCHLIST',
                translate: 'NAV.STOCK.SUBTITLES.DISPATCHLIST',
                hidden   : false,
                type     : 'item',
                icon     : 'supervisor_account',
                url      : 'Dispatch/all',
            }
        ]
    },
];
