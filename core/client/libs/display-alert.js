import {Meteor} from 'meteor/meteor';
import {TAPi18n} from 'meteor/tap:i18n';
import {sAlert} from 'meteor/juliancwirko:s-alert';

export const displaySuccess = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        msg = TAPi18n.__('alert.success');
    }

    // sAlert.success(msg);
    swal({
        title: "Success",
        text: msg,
        type: "success",
        allowEscapeKey: false,
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: true,
        timer: 3000
    }).done();
};

export const displayError = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        msg = TAPi18n.__('alert.error');
    }

    // sAlert.error(msg);
    swal({
        title: "Error",
        text: msg,
        type: "error",
        allowEscapeKey: false,
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: true,
        timer: 3000
    }).done();
};
