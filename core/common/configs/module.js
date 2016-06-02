Module = typeof Module === 'undefined' ? {} : Module;

Module.Core = {
    name: 'Core System',
    version: '2.0.0',
    summary: 'Core Management System is ...',
    roles: [
        'super',
        'admin'
    ],
    dump: {
        data: [
            'roles',
            'users',
            'core_setting',
            'core_currency',
            'core_company',
            'core_branch',
            'core_exchange'
        ]
    }
};
