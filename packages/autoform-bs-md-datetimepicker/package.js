Package.describe({
    name: 'theara:autoform-bs-md-datetimepicker',
    version: '0.4.1',
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

    api.use([
        'jquery',
        'underscore',
        'templating',
        'momentjs:moment@2.10.6',
        'fezvrasta:bootstrap-material-design@0.3.0',
        'planettraining:material-design-icons-font@2.1.1_2',
        'aldeed:autoform@5.7.1'
    ], 'client');

    api.export([
        'bmDateTimePickerOpts'
    ], 'client');

    api.addFiles([
        'lib/css/bootstrap-material-datetimepicker.css',
        'lib/css/custom.css',
        'lib/js/bootstrap-material-datetimepicker.js',
        'autoform-bs-md-datetimepicker.html',
        'autoform-bs-md-datetimepicker.js',
        'bs-md-datetimepicker-opts.js'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-bs-md-datetimepicker');
    api.addFiles('autoform-bs-md-datetimepicker-tests.js');
});
