import {$} from 'meteor/jquery';
import {_} from 'meteor/erasaur:meteor-lodash';

// Select 2
export const clearSelect2 = function (elements) {
    elements = _.isUndefined(elements) ? [] : (_.isArray(elements) ? elements : [elements]);

    if (_.isEmpty(elements)) {
        $('.select2-container').each(function () {
            $(this).select2('val', '');
        });

        //console.log('clear all select2');
    } else {
        _.forEach(elements, function (element) {
            element.select2('val', '');
        });

        //console.log('clear select2: ' + element);
    }
};

// Selectize
export const clearSelectize = function (elements) {
    elements = _.isUndefined(elements) ? [] : (_.isArray(elements) ? elements : [elements]);

    if (_.isEmpty(elements)) {
        $('.selectized').each(function () {
            $(this)[0].selectize.clear(true);
        });

        //console.log('clear all selectize');
    } else {
        _.forEach(elements, function (element) {
            element[0].selectize.clear(true);

            //console.log('clear selectize:' + element);
        });
    }
};
