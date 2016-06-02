Package.describe({
    name: 'theara:inputmask',
    version: '3.2.6_7',
    // Brief, one-line summary of the package.
    summary: 'Inputmask JS',
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
        'jquery'
    ], 'client');

    api.addFiles('lib/jquery.inputmask.bundle.js', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:inputmask');
    api.addFiles('inputmask-tests.js');
});
