Package.describe({
    name: 'theara:autoform-inputmask',
    version: '0.4.7',
    // Brief, one-line summary of the package.
    summary: 'Inputmask for AutoForm',
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
        'underscore',
        'templating',
        'tracker',
        'aldeed:autoform@5.7.1'
    ], 'client');

    api.addFiles([
        'autoform-inputmask.html',
        'autoform-inputmask.js'
    ], 'client');

    api.addFiles([
        'inputmask-opts.js'
    ]);

    api.export([
        'inputmaskOptions'
    ]);
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-inputmask');
    api.addFiles('autoform-inputmask-tests.js');
});
