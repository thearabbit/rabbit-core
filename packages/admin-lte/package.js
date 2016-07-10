Package.describe({
    name: 'theara:admin-lte',
    version: '2.3.5_6',
    // Brief, one-line summary of the package.
    summary: 'AdmintLTE Layout',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');

    // Package
    api.use([
        'modules',
        'jquery',
        'templating',
        'twbs:bootstrap@3.3.6',
        'fortawesome:fontawesome@4.5.0'
    ], 'client');

    // Plugins CSS
    api.addFiles([
        'lib/plugins/select2/select2.css'
    ], 'client');

    // Plugins JS
    api.addFiles([
        'lib/index.js',
        'lib/plugins/fastclick/fastclick.min.js',
        'lib/plugins/slimScroll/jquery.slimscroll.min.js',
        'lib/plugins/select2/select2.full.min.js'
    ], 'client');

    // Theme CSS
    api.addFiles([
        'lib/css/fonts.css',
        'lib/css/AdminLTE.css',
        // 'lib/css/custom.css'
    ], 'client');

    // Theme Skins
    api.addFiles([
        'lib/css/skins/_all-skins.css',
        // 'lib/css/skins/skin-black.css',
        // 'lib/css/skins/skin-black-light.css',
        // 'lib/css/skins/skin-blue.css',
        // 'lib/css/skins/skin-blue-light.css',
        // 'lib/css/skins/skin-green.css',
        // 'lib/css/skins/skin-green-light.css',
        // 'lib/css/skins/skin-purple.css',
        // 'lib/css/skins/skin-red.css',
        // 'lib/css/skins/skin-red-light.css',
        // 'lib/css/skins/skin-yellow.css',
        // 'lib/css/skins/skin-yellow-light.css'
    ], 'client');

    // Image
    api.addAssets([
        'lib/img/avatar.png',
        'lib/img/avatar2.png',
        'lib/img/avatar3.png',
        'lib/img/avatar04.png',
        'lib/img/avatar5.png',
        'lib/img/boxed-bg.jpg',
        'lib/img/boxed-bg.png',
        'lib/img/default-50x50.gif',
        'lib/img/icons.png',
        'lib/img/photo1.png',
        'lib/img/photo2.png',
        'lib/img/photo3.jpg',
        'lib/img/photo4.jpg',
        'lib/img/user1-128x128.jpg',
        'lib/img/user2-160x160.jpg',
        'lib/img/user3-128x128.jpg',
        'lib/img/user4-128x128.jpg',
        'lib/img/user5-128x128.jpg',
        'lib/img/user6-128x128.jpg',
        'lib/img/user7-128x128.jpg',
        'lib/img/user8-128x128.jpg',
        'lib/img/credit/american-express.png',
        'lib/img/credit/cirrus.png',
        'lib/img/credit/mastercard.png',
        'lib/img/credit/mestro.png',
        'lib/img/credit/paypal.png',
        'lib/img/credit/paypal2.png',
        'lib/img/credit/visa.png'
    ], 'client');

    // Fonts
    api.addAssets([
        'lib/fonts/source-sans-pro-v9-latin-300.eot',
        'lib/fonts/source-sans-pro-v9-latin-300.svg',
        'lib/fonts/source-sans-pro-v9-latin-300.ttf',
        'lib/fonts/source-sans-pro-v9-latin-300.woff',
        'lib/fonts/source-sans-pro-v9-latin-300.woff2',
        'lib/fonts/source-sans-pro-v9-latin-300italic.eot',
        'lib/fonts/source-sans-pro-v9-latin-300italic.svg',
        'lib/fonts/source-sans-pro-v9-latin-300italic.ttf',
        'lib/fonts/source-sans-pro-v9-latin-300italic.woff',
        'lib/fonts/source-sans-pro-v9-latin-300italic.woff2',
        'lib/fonts/source-sans-pro-v9-latin-600.eot',
        'lib/fonts/source-sans-pro-v9-latin-600.svg',
        'lib/fonts/source-sans-pro-v9-latin-600.ttf',
        'lib/fonts/source-sans-pro-v9-latin-600.woff',
        'lib/fonts/source-sans-pro-v9-latin-600.woff2',
        'lib/fonts/source-sans-pro-v9-latin-600italic.eot',
        'lib/fonts/source-sans-pro-v9-latin-600italic.svg',
        'lib/fonts/source-sans-pro-v9-latin-600italic.ttf',
        'lib/fonts/source-sans-pro-v9-latin-600italic.woff',
        'lib/fonts/source-sans-pro-v9-latin-600italic.woff2',
        'lib/fonts/source-sans-pro-v9-latin-700.eot',
        'lib/fonts/source-sans-pro-v9-latin-700.svg',
        'lib/fonts/source-sans-pro-v9-latin-700.ttf',
        'lib/fonts/source-sans-pro-v9-latin-700.woff',
        'lib/fonts/source-sans-pro-v9-latin-700.woff2',
        'lib/fonts/source-sans-pro-v9-latin-700italic.eot',
        'lib/fonts/source-sans-pro-v9-latin-700italic.svg',
        'lib/fonts/source-sans-pro-v9-latin-700italic.ttf',
        'lib/fonts/source-sans-pro-v9-latin-700italic.woff',
        'lib/fonts/source-sans-pro-v9-latin-700italic.woff2',
        'lib/fonts/source-sans-pro-v9-latin-regular.eot',
        'lib/fonts/source-sans-pro-v9-latin-regular.svg',
        'lib/fonts/source-sans-pro-v9-latin-regular.ttf',
        'lib/fonts/source-sans-pro-v9-latin-regular.woff',
        'lib/fonts/source-sans-pro-v9-latin-regular.woff2',
        'lib/fonts/source-sans-pro-v9-latin-italic.eot',
        'lib/fonts/source-sans-pro-v9-latin-italic.svg',
        'lib/fonts/source-sans-pro-v9-latin-italic.ttf',
        'lib/fonts/source-sans-pro-v9-latin-italic.woff',
        'lib/fonts/source-sans-pro-v9-latin-italic.woff2'
    ], 'client');

    api.addFiles([
        'admin-lte.js'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('theara:admin-lte');
    api.addFiles('admin-lte-tests.js');
});
