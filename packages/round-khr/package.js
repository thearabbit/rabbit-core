Package.describe({
    name: 'theara:round-khr',
    version: '0.0.3',
    // Brief, one-line summary of the package.
    summary: 'Round KHR Currency',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    api.use('ecwyne:mathjs@2.1.1');

    api.export('roundKhr');

    api.addFiles('round-khr.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:round-khr');
    api.addFiles('round-khr-tests.js');
});
