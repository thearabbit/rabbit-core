Package.describe({
    name: 'theara:select2',
    version: '4.0.2_5',
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

    api.use("jquery", "client");

    api.addFiles([
        'lib/v4/select2.css',
        // 'lib/select2-bootstrap.css',
        'lib/v4/select2.full.min.js'
    ], "client");
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:select2');
    api.addFiles('select2-tests.js');
});
