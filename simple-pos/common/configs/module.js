Module = typeof Module === 'undefined' ? {} : Module;

Module.SimplePos = {
    name: 'Simple POS',
    version: '2.0.0',
    summary: 'Simple POS is ...',
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
