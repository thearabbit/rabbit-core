Template.registerHelper('autoprint', function (options) {
    var options = _.isUndefined(options) ? {} : options;
    var optionsHash = _.isUndefined(options.hash) ? {} : options.hash;

    _.defaults(optionsHash, {
        close: false,
        timeout: 500
    });

    Meteor.setTimeout(function () {
        // Print
        window.print();

        // Close
        if (optionsHash.close == true || optionsHash.close == 'true') {
            window.close();
        }
    }, optionsHash.timeout);
});
