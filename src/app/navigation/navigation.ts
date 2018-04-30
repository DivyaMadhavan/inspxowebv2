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
            'id'       : 'usermanagement',
            'title'    : 'usermanagement',
            'translate': 'Manage User',
            'type'     : 'collapse',
            'icon'     : 'account_circle',
            'children' : [               
                {
                    'id'        : 'users',
                    'title'     : 'Users',
                    'type'      : 'item',
                    'url'       : '/apps/usermanagement/users'                   
                }
            ]
        }
     ]
    }
];
