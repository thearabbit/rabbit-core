Package.describe({
    name: 'theara:particles',
    version: '0.0.9',
    // Brief, one-line summary of the package.
    summary: 'Particles JS',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');

    api.addFiles([
        'lib/style.css',
        'lib/particles.js'
    ], 'client');

    api.addFiles([
        'particles.js'
    ], 'client');

    api.export([
        'pJS',
        'pJSConfig'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:particles');
    api.addFiles('particles-tests.js');
});
