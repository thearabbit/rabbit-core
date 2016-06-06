import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {TAPi18n} from 'meteor/tap:i18n';
import {_} from 'meteor/erasaur:meteor-lodash';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from  'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';

// Lib
import {displaySuccess, displayError} from './display-alert.js';

export const destroyAction = (collection, selector = {}, options = {}) => {
    check(collection, Mongo.Collection);
    check(selector, Object);
    check(options, Object);

    _.defaults(options, {
        title: 'Delete',
        itemTitle: 'this item',
        successMsg: null,
        errorMsg: null,
        i18n: true
    });

    alertify.confirm(
        fa("trash", options.title),
        TAPi18n.__('alert.deleteConfirm', {itemTitle: options.itemTitle}),
        function () {
            collection.remove(selector, function (error) {
                if (error) {
                    // sAlert.error(options.errorMsg ? options.errorMsg : error.message);
                    displayError(options.errorMsg, options.i18n);
                } else {
                    // sAlert.success(options.successMsg);
                    displaySuccess(options.successMsg, options.i18n);
                }
            });
        },
        null
    );
};
