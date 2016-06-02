import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';

import {SelectOpts} from '../../ui/libs/select-opts.js';

export const WelcomeSchema = {};
// Login
WelcomeSchema.login = new SimpleSchema({
    username: {
        type: String,
        label: function () {
            return TAPi18n.__('core.welcome.username');
        }
    },
    password: {
        type: String,
        label: function () {
            return TAPi18n.__('core.welcome.password');
        }
    }
});

// Config
WelcomeSchema.config = new SimpleSchema({
    module: {
        type: String,
        label: function () {
            return TAPi18n.__('core.welcome.module');
        },
        autoform: {
            type: "select2",
            options: function () {
                return Meteor.isClient && SelectOpts.roleForCurrentUser();
            },
            afFieldInput: {
                value: function () {
                    return Meteor.isClient && Session.get('currentModule');
                }
            }
        }
    },
    branch: {
        type: String,
        label: function () {
            return TAPi18n.__('core.welcome.branch');
        },
        autoform: {
            type: "select2",
            options: function () {
                return Meteor.isClient && SelectOpts.branchForCurrentUser();
            },
            afFieldInput: {
                value: function () {
                    return Meteor.isClient && Session.get('currentBranch');
                }
            }
        }
    }
});
