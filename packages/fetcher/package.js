Package.describe({
    name: 'theara:fetcher',
    version: '0.0.2',
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

    api.use('reactive-dict', 'client');

    api.addFiles('fetcher.js', 'client');
    api.export('Fetcher', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:fetcher');
    api.addFiles('fetcher-tests.js');
});
