Module = typeof Module === 'undefined' ? {} : Module;

Module.Simple = {
    name: 'Simple System',
    version: '2.0.0',
    summary: 'Simple Management System is ...',
    roles: [
        'setting',
        'data-insert',
        'data-update',
        'data-remove',
        'reporter'
    ],
    dump: {
        setting: [
            'simple_location'
        ],
        data: [
            'simple_customer',
            'simple_order'
        ]
    }
};
