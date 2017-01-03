Package.describe({
    name: 'theara:treegrid',
    version: '0.0.4',
    // Brief, one-line summary of the package.
    summary: 'TreeGrid plugin for jQuery',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.4.2.3');
    api.use('ecmascript');

    // Asset
    api.addAssets([
        'lib/img/collapse.png',
        'lib/img/expand.png',
        'lib/img/file.png',
        'lib/img/folder.png',
    ], 'client');

    // CSS
    api.addFiles([
        'lib/css/jquery.treegrid.css',
    ], 'client');

    // JS
    api.addFiles([
        'lib/js/jquery.treegrid.js',
        'lib/js/jquery.treegrid.bootstrap3.js',
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:treegrid');
    api.mainModule('treegrid-tests.js');
});
