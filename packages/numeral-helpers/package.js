Package.describe({
    name: 'theara:numeral-helpers',
    version: '0.0.4',
    // Brief, one-line summary of the package.
    summary: 'Helper for Numeral JS',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');
    api.use('ecmascript');

    api.use([
        'templating',
        'numeral:numeral@1.5.3'
    ], 'client');

    api.addFiles('numeral-helpers.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:numeral-helpers');
    api.addFiles('numeral-helpers-tests.js');
});
