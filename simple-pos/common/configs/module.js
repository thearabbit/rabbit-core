Module = typeof Module === 'undefined' ? {} : Module;

Module.SimplePos = {
    name: 'Simple POS System',
    version: '2.0.0',
    summary: 'Simple POS Management System is ...',
    roles: [
        'setting',
        'data-insert',
        'data-update',
        'data-remove',
        'reporter'
    ],
    dump: {
        setting: [
            'simplePos_location'
        ],
        data: [
            'simplePos_customer',
            'simplePos_order'
        ]
    }
};
