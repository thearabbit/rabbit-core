Package.describe({
    name: 'theara:round2',
    version: '0.0.6',
    // Brief, one-line summary of the package.
    summary: 'Round a number to a specific number of decimal places: 1.234 → 1.2',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Npm.depends({
    'round-to': '1.1.0'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3.4.1');
    api.use([
        'ecmascript',
        'check'
    ]);

    api.mainModule('round2.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:round2');
    api.mainModule('round2-tests.js');
});
