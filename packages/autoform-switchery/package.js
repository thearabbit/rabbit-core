Package.describe({
    name: 'theara:autoform-switchery',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Autoform-Switchery',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.4.0.1');
    api.use('ecmascript');

    api.use('templating');
    api.use('tracker');
    api.use('aldeed:autoform@4.0.0 || 5.0.0');
    api.use('abpetkov:switchery@0.1.0');

    api.addFiles([
        'autoform-switchery.html',
        'autoform-switchery.js'
    ], 'client');
    // api.mainModule('autoform-switchery.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-switchery');
    api.mainModule('autoform-switchery-tests.js');
});
