Package.describe({
    name: 'theara:flow-router-breadcrumb',
    version: '0.3.4',
    // Brief, one-line summary of the package.
    summary: 'Breadcrumb For Flow Router',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/thearabbit/flow-router-breadcrumb.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    api.use([
        'templating',
        'underscore',
        'kadira:flow-router@2.10.1',
        'fortawesome:fontawesome@4.5.0'
    ], 'client');

    api.addFiles('flow-router-breadcrumb.js', 'client');
    api.addFiles('flow-router-breadcrumb.html', 'client');

    api.export('Breadcrumb', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:flow-router-breadcrumb');
    api.addFiles('flow-router-breadcrumb-tests.js');
});
