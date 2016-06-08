Package.describe({
    name: 'theara:id-generator',
    version: '0.0.8',
    // Brief, one-line summary of the package.
    summary: 'Generate id for collections',
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
        'underscore',
        'underscorestring:underscore.string@3.0.3',
        'erasaur:meteor-lodash@4.0.0'
    ]);

    api.addFiles([
        'id-generator.js',
        'id-generator2.js'
    ]);

    api.export('idGenerator');
    api.export('idGenerator2');
});
