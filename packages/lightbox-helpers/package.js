Package.describe({
    name: 'theara:lightbox-helpers',
    version: '0.0.7',
    // Brief, one-line summary of the package.
    summary: 'Lightbox Helpers',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    api.use(['underscore', 'templating', 'random'], 'client');

    api.export('lightbox', 'client');

    api.addFiles('lightbox-helpers.js');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('tinytest');
    api.use('theara:lightbox-helpers');
    api.addFiles('lightbox-helpers-tests.js');
});
