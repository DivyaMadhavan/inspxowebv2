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
                'id'       : 'createtemplate',
                'title'    : 'Create Template',               
                'type'     : 'item',
                'icon'     : 'lock',
                'url'      : '/createtemplate'
            }
        ]
    }
];
