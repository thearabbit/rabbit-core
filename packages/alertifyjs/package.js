Package.describe({
    name: 'theara:alertifyjs',
    version: '1.6.1',
    // Brief, one-line summary of the package.
    summary: 'A javascript framework for developing pretty browser dialogs and notifications',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');

    api.addFiles('lib/css/alertify.css', 'client');
    api.addFiles('lib/css/themes/default.css', 'client');
    // api.addFiles('lib/css/themes/bootstrap.css', 'client');
    api.addFiles('lib/alertify.js', 'client');

    api.addFiles('alertifyjs.js', 'client');

    api.export('alertify', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:alertifyjs');
    api.addFiles('alertifyjs-tests.js');
});
