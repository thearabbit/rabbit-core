Package.describe({
    name: 'theara:autoform-select2',
    version: '0.1.5',
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
        'templating',
        'blaze',
        'jquery',
        'underscore',
        'tracker',
        // 'aldeed:template-extension@4.0.0',
        'aldeed:template-extension@3.4.3',
        'aldeed:autoform@5.8.1',
    ], 'client');

    api.addFiles([
        'autoform-select2.html',
        'autoform-select2.js'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-select2');
    api.addFiles('autoform-select2-tests.js');
});
