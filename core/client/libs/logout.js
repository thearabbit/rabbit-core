import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Session} from  'meteor/session';
import {Bert} from 'meteor/themeteorchef:bert';

export const Logout = ()=> {
    Meteor.logout((error)=> {
        if (!error) {
            // Clear Session
            Session.clear();
            // Session.clearPersistent();

            FlowRouter.go('core.welcome');

            swal({
                title: "Success",
                text: 'You are logout!',
                type: "success",
                allowEscapeKey: true,
                showCloseButton: true,
                showConfirmButton: false,
                allowOutsideClick: true,
                timer: 1000
            }).done();

        }
    });
};
