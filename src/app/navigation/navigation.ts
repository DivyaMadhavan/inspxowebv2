export const navigation = [
    { 

     'id'       : 'applications',
    'title'    : 'Applications',
    'translate': 'NAV.APPLICATIONS',
    'type'     : 'group',
    'icon'     : 'apps',
    'children' : [
        {
            'id'       : 'dashboards',
            'title'    : 'Dashboards',
            'translate': 'DASHBOARDS',
            'type'     : 'collapse',
            'icon'     : 'dashboard',
            'children' : [
                {
                    'id'   : 'analytics',
                    'title': 'DASHBOARD',
                    'type' : 'item',
                    'url'  : '/Dashboard'
                }
            ]
        },
         {
            'id'       : 'usermangement',
            'title'    : 'usermangement',
            'translate': 'Manage User',
            'type'     : 'collapse',
            'icon'     : 'shopping_cart',
            'children' : [
               
                {
                    'id'        : 'users',
                    'title'     : 'Users',
                    'type'      : 'item',
                    'url'       : '/apps/usermangement/users',
                    'exactMatch': true
                }
            ]
        },

    }    
];
