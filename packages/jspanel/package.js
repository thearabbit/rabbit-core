Package.describe({
    name: 'theara:jspanel',
    version: '3.4.1_2',
    // Brief, one-line summary of the package.
    summary: 'A jQuery plugin to create highly configurable multifunctional floating panels',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3.5.1');
    api.use('ecmascript');

    // Asset
    api.addAssets([
        'lib/source/fonts/jsglyph.eot',
        'lib/source/fonts/jsglyph.svg',
        'lib/source/fonts/jsglyph.ttf',
        'lib/source/fonts/jsglyph.woff',
    ], 'client');

    // CSS
    api.addFiles([
        'lib/source/jquery.jspanel.css',
        'lib/vendor/jquery-ui-1.12.1.complete/jquery-ui.min.css',
    ], 'client');

    // JS
    api.addFiles([
        'lib/vendor/jquery-ui-1.12.1.complete/jquery-ui.min.js',
        'lib/vendor/jquery.ui.touch-punch.min.js',
        'lib/source/jquery.jspanel-compiled.js',
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:jspanel');
    api.mainModule('jspanel-tests.js');
});
