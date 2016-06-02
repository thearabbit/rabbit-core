import {Meteor} from 'meteor/meteor';
import {alertify} from 'meteor/ovcharik:alertifyjs';

Meteor.startup(function () {
    /*** Alertify ***/
    alertify.defaults = {
        // dialogs defaults
        modal: true,
        basic: false,
        frameless: false,
        movable: true,
        moveBounded: false,
        resizable: true,
        closable: true,
        closableByDimmer: true,
        maximizable: true,
        startMaximized: false,
        pinnable: true,
        pinned: true,
        padding: true,
        overflow: true,
        maintainFocus: true,
        transition: 'zoom',
        autoReset: true,

        // notifier defaults
        notifier: {
            // auto-dismiss wait time (in seconds)
            delay: 5,
            // default position
            position: 'bottom-right'
        },

        // language resources
        glossary: {
            // dialogs default title
            title: 'AlertifyJS',
            // ok button text
            ok: 'OK',
            // cancel button text
            cancel: 'Cancel'
        },

        // theme settings
        // theme: {
        //     // class name attached to prompt dialog input textbox.
        //     input: 'ajs-input',
        //     // class name attached to ok button
        //     ok: 'ajs-ok',
        //     // class name attached to cancel button
        //     cancel: 'ajs-cancel'
        // }
        theme: {
            // class name attached to prompt dialog input textbox.
            input: 'form-control',
            // class name attached to ok button
            ok: 'btn btn-primary',
            // class name attached to cancel button
            cancel: 'btn btn-danger'
        }
    };
});
