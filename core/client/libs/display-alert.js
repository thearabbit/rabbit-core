import {Meteor} from 'meteor/meteor';
import {TAPi18n} from 'meteor/tap:i18n';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {Bert} from 'meteor/themeteorchef:bert';

export const displaySuccess = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        msg = TAPi18n.__('alert.success');
    }

    // sAlert.success(msg);
    Bert.alert({
        title: 'Success',
        message: msg,
        type: 'success',
        style: 'growl-top-right'
    });
    // swal({
    //     title: "Success",
    //     text: msg,
    //     type: "success",
    //     allowEscapeKey: false,
    //     showCloseButton: true,
    //     showConfirmButton: false,
    //     allowOutsideClick: true,
    //     timer: 2000
    // }).done();
};

export const displayError = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        // Check duplicate key
        if (_.includes(msg, 'duplicate key')) {
            msg = TAPi18n.__('alert.duplicate');
        } else {
            msg = TAPi18n.__('alert.error');
        }
    }

    // sAlert.error(msg);
    Bert.alert({
        title: 'Error',
        message: msg,
        type: 'danger',
        style: 'growl-top-right'
    });
    // swal({
    //     title: "Error",
    //     text: msg,
    //     type: "error",
    //     allowEscapeKey: false,
    //     showCloseButton: true,
    //     showConfirmButton: false,
    //     allowOutsideClick: true,
    //     timer: 2000
    // }).done();
};

export const displayWarning = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        msg = TAPi18n.__('alert.waring');
    }

    // sAlert.error(msg);
    Bert.alert({
        title: 'Warning',
        message: msg,
        type: 'warning',
        style: 'growl-top-right'
    });
    // swal({
    //     title: "Warning",
    //     text: msg,
    //     type: "warning",
    //     allowEscapeKey: false,
    //     showCloseButton: true,
    //     showConfirmButton: false,
    //     allowOutsideClick: true,
    //     timer: 2000
    // }).done();
};

export const displayInfo = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        msg = TAPi18n.__('alert.info');
    }

    // sAlert.error(msg);
    Bert.alert({
        title: 'Info',
        message: msg,
        type: 'info',
        style: 'growl-top-right'
    });
    // swal({
    //     title: "Info",
    //     text: msg,
    //     type: "info",
    //     allowEscapeKey: false,
    //     showCloseButton: true,
    //     showConfirmButton: false,
    //     allowOutsideClick: true,
    //     timer: 2000
    // }).done();
};

export const displayDefault = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        msg = TAPi18n.__('alert.question');
    }

    // sAlert.error(msg);
    Bert.alert({
        title: 'Default',
        message: msg,
        type: 'default',
        style: 'growl-top-right'
    });
};

export const displayQuestion = (msg = null, i18n = false) => {
    if (msg) {
        msg = i18n == true ? TAPi18n.__(msg) : msg;
    } else {
        msg = TAPi18n.__('alert.question');
    }

    // sAlert.error(msg);
    swal({
        title: "Question",
        text: msg,
        type: "question",
        allowEscapeKey: false,
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: true,
        timer: 2000
    }).done();
};
