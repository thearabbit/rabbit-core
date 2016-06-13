import {Meteor} from 'meteor/meteor';
import {Bert} from  'meteor/themeteorchef:bert';

Meteor.startup(function () {
    Bert.defaults = {
        hideDelay: 3500,
        // Accepts: a number in milliseconds.
        style: 'growl-top-right',
        // Accepts: fixed-top, fixed-bottom, growl-top-left,   growl-top-right,
        // growl-bottom-left, growl-bottom-right.
        type: 'default'
        // Accepts: default, success, info, warning, danger.
    };
});
