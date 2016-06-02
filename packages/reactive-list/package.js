Package.describe({
    name: 'theara:reactive-list',
    version: '0.2.9',
    // Brief, one-line summary of the package.
    summary: 'Reactive List',
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
        'deps',
        'underscore'
    ]);

    api.export('ReactiveList');

    api.addFiles('reactive-list.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:reactive-list');
    api.addFiles('reactive-list-tests.js');
});
