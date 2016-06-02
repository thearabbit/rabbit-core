Package.describe({
    name: 'theara:scrollup',
    version: '0.2.3',
    // Brief, one-line summary of the package.
    summary: 'Scroll Up',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');

    api.use('fortawesome:fontawesome@4.4.0', 'client');

    api.addFiles('jquery.scrollUp.min.js', 'client');
    api.addFiles('scrollup_startup.js', 'client');
    api.addFiles('scrollup.css', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:scrollup');
    api.addFiles('scrollup-tests.js');
});
