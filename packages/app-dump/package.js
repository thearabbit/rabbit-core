Package.describe({
    name: 'theara:app-dump',
    version: '1.0.1',
    // Brief, one-line summary of the package.
    summary: 'Meteor App Dump',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Npm.depends({
    "busboy": "0.2.11",
    "mongodb-backup": "1.5.1",
    "mongodb-restore": "1.5.1"
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    // SERVER
    api.use([
        'check',
        'mongo',
        'underscore',
        'meteorhacks:picker@1.0.3',
        'momentjs:moment@2.10.6',
        'matb33:collection-hooks@0.8.1',
        'dburles:mongo-collection-instances@0.3.4'
    ], ['server']);

    api.addFiles([
        'app-dump.js'
    ], ['server']);
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:app-dump');
    api.addFiles('app-dump-tests.js');
});
