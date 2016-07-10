import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {TAPi18n} from 'meteor/tap:i18n';
import {_} from 'meteor/erasaur:meteor-lodash';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from  'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';

// Lib
import {displaySuccess, displayError} from './display-alert.js';
import {__} from '../../common/libs/tapi18n-callback-helper.js';

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

    swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this <span class="text-red">[${options.itemTitle}]</span>!`,
        type: 'warning',
        allowEscapeKey: false,
        allowOutsideClick: true,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#dd4b39",
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true
    }).then(function () {
        collection.remove(selector, function (error) {
            if (error) {
                // sAlert.error(options.errorMsg ? options.errorMsg : error.message);
                displayError(options.errorMsg, options.i18n);
            } else {
                swal({
                    title: "Deleted!",
                    text: `Your doc <span class="text-red">[${options.itemTitle}]</span> has been deleted`,
                    type: "success",
                    allowEscapeKey: false,
                    showCloseButton: true,
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    timer: 3000
                }).done();
            }
        });
    }).done();

    // alertify.confirm(
    //     fa("trash", options.title),
    //     TAPi18n.__('alert.deleteConfirm', {itemTitle: options.itemTitle}),
    //     function () {
    //         collection.remove(selector, function (error) {
    //             if (error) {
    //                 // sAlert.error(options.errorMsg ? options.errorMsg : error.message);
    //                 displayError(options.errorMsg, options.i18n);
    //             } else {
    //                 // sAlert.success(options.successMsg);
    //                 displaySuccess(options.successMsg, options.i18n);
    //             }
    //         });
    //     },
    //     null
    // );
};
