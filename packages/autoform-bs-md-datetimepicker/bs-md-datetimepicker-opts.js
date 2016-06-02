bmDateTimePickerOpts = {
    date: function (options) {
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'DD-MM-YYYY',
            date: true,
            time: false
        });

        return options;
    },
    dateTime: function (options) {
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'DD-MM-YYYY HH:mm:ss',
            date: true,
            time: true
        });

        return options;
    },
    time: function (options) {
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            format: 'HH:mm:ss',
            date: false,
            time: true
        });

        return options;
    }
};
