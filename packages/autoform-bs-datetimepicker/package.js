Package.describe({
    name: 'theara:autoform-bs-datetimepicker',
    version: '0.6.0',
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

    // Ensure momentjs packages load before this one if used
    api.use([
            'momentjs:moment@2.11.0',
            'mrt:moment-timezone@0.2.1'
        ],
        'client',
        {weak: true});

    api.use([
        'jquery',
        'underscore',
        'templating',
        'tracker',
        'momentjs:moment@2.11.0',
        'aldeed:autoform@5.8.1'
    ], 'client');

    //api.export([
    //    'dateTimePickerOpts'
    //], 'client');

    api.addFiles([
        'lib/bootstrap-datetimepicker.css',
        'lib/bootstrap-datetimepicker.min.js',
        'autoform-bs-datetimepicker.html',
        'autoform-bs-datetimepicker.js',
        'lib/bootstrap-collapse-transitions.js'
        //'bs-datetimepicker-opts.js'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:autoform-bs-datetimepicker');
    api.addFiles('autoform-bs-datetimepicker-tests.js');
});
