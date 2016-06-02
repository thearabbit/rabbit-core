Inputmask = {
    currency: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
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

        _.forEach(elements, function (element) {
            //element.inputmask('numeric', options);
            element.inputmask('numeric', options);
        });
    },
    decimal: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            autoUnmask: true,
            //removeMaskOnSubmit: true,
            rightAlign: false,
            radixPoint: ".",
            autoGroup: true,
            groupSeparator: ",",
            groupSize: 3
        });

        _.forEach(elements, function (element) {
            element.inputmask('numeric', options);
        });
    },
    integer: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
            //autoUnmask: true,
            //removeMaskOnSubmit: true,
            rightAlign: false,
            radixPoint: "",
            digits: 0
        });

        _.forEach(elements, function (element) {
            element.inputmask('numeric', options);
        });
    },
    percentage: function (elements, options) {
        elements = _.isArray(elements) ? elements : [elements];
        options = _.isObject(options) ? options : {};

        _.defaults(options, {
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

        _.forEach(elements, function (element) {
            element.inputmask('numeric', options);
        });
    }
};
