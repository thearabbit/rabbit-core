Package.describe({
    name: 'theara:fa-helpers',
    version: '0.0.5',
    // Brief, one-line summary of the package.
    summary: 'Font Awesome helper',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    api.use([
        'underscore',
        'templating',
        'fortawesome:fontawesome@4.5.0'
    ], 'client');

    api.export('fa', 'client');

    api.addFiles('fa-helpers.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:fa-helpers');
    api.addFiles('fa-helpers-tests.js');
});
