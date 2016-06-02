Package.describe({
    name: 'theara:autoform-file',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Auto Form File',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.4-logging.0');
    api.use('ecmascript');

    api.use([
        'check',
        'coffeescript',
        'underscore',
        'reactive-var',
        'templating',
        'less',
        'aldeed:autoform@5.5.1',
        'fortawesome:fontawesome@4.4.0',
        'cfs:ui'
    ]);

    api.addFiles('lib/client/autoform-file.html', 'client');
    api.addFiles('lib/client/autoform-file.less', 'client');
    api.addFiles('lib/client/autoform-file.js', 'client');
    api.addFiles('lib/server/publish.coffee', 'server');

    api.addFiles('autoform-file.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-file');
    api.addFiles('autoform-file-tests.js');
});
