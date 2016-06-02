inputmaskOptions = {
    currency: function (options) {
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            alias: 'numeric',
            autoUnmask: true,
            //removeMaskOnSubmit: true,
            rightAlign: false,
            radixPoint: ".",
            autoGroup: true,
            groupSeparator: ",",
            groupSize: 3,
            digits: 2,
            prefix: "$ ",
            placeholder: "0"
        });

        return options;
    },
    decimal: function (options) {
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            alias: 'numeric',
            autoUnmask: true,
            //removeMaskOnSubmit: true,
            rightAlign: false,
            radixPoint: ".",
            autoGroup: true,
            groupSeparator: ",",
            groupSize: 3
        });

        return options;
    },
    integer: function (options) {
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            alias: 'numeric',
            //autoUnmask: true,
            //removeMaskOnSubmit: true,
            rightAlign: false,
            radixPoint: "",
            digits: 0
        });

        return options;
    },
    percentage: function (options) {
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            alias: 'numeric',
            autoUnmask: true,
            //removeMaskOnSubmit: true,
            rightAlign: false,
            digits: 2,
            radixPoint: ".",
            placeholder: "0",
            autoGroup: false,
            min: 0,
            max: 100,
            suffix: " %",
            allowPlus: false,
            allowMinus: false
        });

        return options;
    }
};
