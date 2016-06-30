import {Meteor} from  'meteor/meteor';
import {Template} from  'meteor/templating';
import {Session} from  'meteor/session';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Roles} from  'meteor/alanning:roles';
import {AutoForm} from 'meteor/aldeed:autoform';
import {_} from 'meteor/erasaur:meteor-lodash';
import {Bert} from 'meteor/themeteorchef:bert';

// Lib
import {Logout} from '../../../client/libs/logout.js';

// Component
import '../../../client/components/loading.js';
import '../../../client/components/column-action.js';
import '../../../client/components/form-footer.js';

// Schema
import {WelcomeSchema} from '../../api/collections/welcome-schema.js';

// Page
import './welcome.html';

// Declare template
var indexTmpl = Template.Core_welcome,
    loginTmpl = Template.Core_welcomeLogin,
    configTmpl = Template.Core_welcomeConfig,
    accessDeniedTmpl = Template.Core_welcomeAccessDenied;

// Index
indexTmpl.helpers({
    role() {
        let role = Roles.getGroupsForUser(Meteor.userId());
        if (role.length > 0) {
            return true;
        }

        return false;
    }
});

// Login
loginTmpl.helpers({
    schema(){
        return WelcomeSchema.login;
    }
});

AutoForm.hooks({
    Core_welcomeLogin: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            this.done(null, insertDoc);
        },
        onSuccess: function (formType, result) {
            Meteor.loginWithPassword(result.username, result.password, (error)=> {
                if (error) {
                    Bert.alert({
                        // title: 'Error',
                        message: error.message,
                        type: 'danger'
                    });
                } else {
                    Bert.alert({
                        // title: 'Success',
                        message: 'You are login',
                        type: 'success'
                    });
                }
            });
        },
        onError: function (formType, error) {
            Bert.alert({
                // title: 'Error',
                message: error.message,
                type: 'danger'
            });
        }
    }
});

// Config
configTmpl.onCreated(function () {
    this.autorun(() => {
        if (Meteor.user() && Meteor.user().rolesBranch) {
            let rolesBranch = Meteor.user().rolesBranch;
            this.subscribe('core.branch', {_id: {$in: rolesBranch}});
        }
    });
});

configTmpl.helpers({
    schema() {
        return WelcomeSchema.config;
    }
});

configTmpl.events({
    'click .js-sign-out': function (event, instance) {
        Logout();
    }
});

AutoForm.hooks({
    Core_welcomeConfig: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            this.done(null, insertDoc);
        },
        onSuccess: function (formType, result) {
            // Set current session
            Session.setAuth('currentModule', result.module);
            Session.setAuth('currentBranch', result.branch);

            let routerName = _.camelCase(result.module) + '.home';

            FlowRouter.go(_.camelCase(result.module) + '.home');
        },
        onError: function (formType, error) {
            Bert.alert({
                // title: 'Error',
                message: error.message,
                type: 'danger'
            });
        }
    }
});

// Access denied
accessDeniedTmpl.events({
    'click .js-sign-out': function (event, instance) {
        Logout();
    }
});
