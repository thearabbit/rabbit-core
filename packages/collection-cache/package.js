Package.describe({
    name: 'theara:collection-cache',
    version: '0.8.5',
    // Brief, one-line summary of the package.
    summary: 'Cache Mongo Collections',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    //Required core packages
    api.use([
        'check',
        'mongo',
        'underscore'
    ], 'server');

    //Required 3rd party packages
    api.use([
        'matb33:collection-hooks@0.8.1',
        'zimme:collection-softremovable@1.0.5'
    ], 'server');

    api.addFiles('methods/cacheTimestamp.js', 'server');
    api.addFiles('methods/cacheDoc.js', 'server');
    api.addFiles('methods/cacheDocBack.js', 'server');
    api.addFiles('methods/cacheCount.js', 'server');
    api.addFiles('methods/cacheField.js', 'server');
    api.addFiles('methods/cacheCompactArrayField.js', 'server');

    api.addFiles('collection-cache.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:collection-cache');
    api.addFiles('collection-cache-tests.js');
});
