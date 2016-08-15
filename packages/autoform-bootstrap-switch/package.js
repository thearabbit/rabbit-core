Package.describe({
    name: 'theara:autoform-bootstrap-switch',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.4.0.1');
    api.use('ecmascript');

    api.use('jquery');
    api.use('templating');
    api.use('tracker');
    api.use('aldeed:autoform@4.0.0 || 5.0.0');

    api.addFiles([
        'lib/css/bootstrap3/bootstrap-switch.css',
        'lib/js/bootstrap-switch.js'
    ], 'client');

    api.addFiles([
        'autoform-bootstrap-switch.html',
        'autoform-bootstrap-switch.js'
    ], 'client');

    // api.mainModule('autoform-bootstrap-switch.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-bootstrap-switch');
    api.mainModule('autoform-bootstrap-switch-tests.js');
});
