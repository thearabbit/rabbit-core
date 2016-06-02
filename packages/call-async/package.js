Package.describe({
    name: 'theara:call-async',
    version: '0.1.9',
    // Brief, one-line summary of the package.
    summary: 'Asynchronous Meteor Calls',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    api.use('reactive-var');

    api.addFiles('call-async.js', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:call-async');
    api.addFiles('call-async-tests.js');
});
