export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'Dashboard',
                'title': 'Dashboard',
                'translate': 'NAV.Dashboard.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/Dashboard',
                'badge': {
                    'title': 25,
                    'translate': 'NAV.Dashboard.BADGE',
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'       : 'User_Mangement',
                'title'    : 'User_Mangement',
                'translate': 'NAV.User_Mangement',
                'type'     : 'collapse',
                'icon'     : 'users',
                'children' : [                   
                    {
                        'id'        : 'usersmgm',
                        'title'     : 'Users',
                        'type'      : 'item',
                        'url'       : '/apps/usermanagement/users',
                        'exactMatch': true
                    }
                ]
           }
        ]
    }
];
