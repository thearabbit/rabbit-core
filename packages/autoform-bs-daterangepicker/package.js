Package.describe({
    name: 'theara:autoform-bs-daterangepicker',
    version: '0.2.0',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');

    api.use([
        'jquery',
        'underscore',
        'templating',
        'momentjs:moment@2.11.0',
        'aldeed:autoform@5.8.1'
    ], 'client');

    api.addFiles([
        'lib/daterangepicker.js',
        'lib/daterangepicker.css',
        'autoform-bs-daterangepicker.html',
        'autoform-bs-daterangepicker.js'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-bs-daterangepicker');
    api.addFiles('autoform-bs-daterangepicker-tests.js');
});
