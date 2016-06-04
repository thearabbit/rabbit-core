import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {EJSON} from 'meteor/ejson';
import {_} from 'meteor/erasaur:meteor-lodash';

// Component
import '../../../client/components/loading.js';
import '../../../client/components/column-action.js';
import '../../../client/components/form-footer.js';

// Lib
import {Logout} from '../../../client/libs/logout.js';
import {createNewAlertify} from '../../../client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../client/libs/render-template.js';

// Schema
import {ProfileSchema} from '../../api/collections/profile-schema.js';

// Method
import {updateProfile} from '../../../common/methods/profile.js';
import {checkPassword} from '../../../common/methods/check-password.js';

// Page
import './profile.html';

// Declare template
var indexTmpl = Template.Core_profile,
    editTmpl = Template.Core_profileEdit;

// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify('profile', {size: 'lg'});
});

indexTmpl.helpers({
    data: function () {
        let currentUser = Meteor.user();

        // Check data
        if (currentUser) {
            currentUser.email = currentUser.emails[0].address;
            currentUser.roles = EJSON.stringify(currentUser.roles);
            currentUser.rolesBranch = EJSON.stringify(currentUser.rolesBranch);

            return currentUser;
        }

        return {};
    }
});

indexTmpl.events({
    'click .js-update': function (event, instance) {
        alertify.profile(fa("pencil", "User Profile"), renderTemplate(editTmpl, this));
    }
});

// Edit
editTmpl.helpers({
    schema(){
        return ProfileSchema;
    },
    data: function () {
        let data = this;
        data.fullName = data.profile.name;

        return data;
    }
});

// Hook
AutoForm.hooks({
    Core_profileEdit: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            let self = this;
            self.event.preventDefault();

            // Check user password before update
            checkPassword.call({password: updateDoc.$set.oldPassword}, function (error, result) {
                if (result.error) {
                    self.done(result.error);
                } else {
                    // Update profile
                    updateProfile.call({modifier: updateDoc.$set, _id: currentDoc._id}, function (error, result) {
                        if (error) {
                            self.done(error);
                        }else {
                            // Call onSuccess to change password
                            self.done(null, updateDoc.$set);
                        }
                    });
                }
            });
        },
        onSuccess: function (formType, result) {
            // Update password
            Accounts.changePassword(result.oldPassword, result.newPassword, function (error) {
                if (error) {
                    sAlert.error(error.message);
                } else {
                    alertify.profile().close();
                    Logout();
                }
            });
        },
        onError: function (formType, error) {
            sAlert.error(error.message);
        }
    }
});
