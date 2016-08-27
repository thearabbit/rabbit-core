import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {EJSON} from 'meteor/ejson';
import {_} from 'meteor/erasaur:meteor-lodash';
import {TAPi18n} from 'meteor/tap:i18n';

// Component
import '../../../client/components/loading.js';
import '../../../client/components/column-action.js';
import '../../../client/components/form-footer.js';

// Lib
import {createNewAlertify} from '../../../client/libs/create-new-alertify.js';
import {renderTemplate} from '../../../client/libs/render-template.js';
import {destroyAction} from '../../../client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../client/libs/display-alert.js';

// Schema
import {UserSchema} from '../../api/collections/user-schema.js';

// Tabular
import {UserTabular} from '../../../common/tabulars/user.js';

// Method
import {insertUser, updateUser, removeUser} from '../../../common/methods/user.js';

// Page
import './user.html';

// Declare template
let indexTmpl = Template.Core_user,
    newTmpl = Template.Core_userNew,
    editTmpl = Template.Core_userEdit,
    showTmpl = Template.Core_userShow;

// Index
indexTmpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify("user", {size: 'lg'});
    createNewAlertify("userShow");
});

indexTmpl.helpers({
    tabularTable(){
        return UserTabular;
    },
    selector(){
        // Check super user
        if (Meteor.user() && Meteor.user().username != 'super') {
            return {username: {$ne: 'super'}};
        }
    },
});

indexTmpl.events({
    'click .js-create': function (event, instance) {
        alertify.user(fa("plus", TAPi18n.__('core.user.title')), renderTemplate(newTmpl));
    },
    'click .js-update': function (event, instance) {
        alertify.user(fa("pencil", TAPi18n.__('core.user.title')), renderTemplate(editTmpl, this));
    },
    'click .js-destroy': function (event, instance) {
        let self = this;

        swal({
            title: 'Are you sure?',
            text: `You won't be able to revert this <span class="text-red">[${self.username}]</span>!`,
            type: 'warning',
            allowEscapeKey: false,
            allowOutsideClick: true,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#dd4b39",
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true
        }).then(function () {
            removeUser.call({userId: self._id}, function (error, result) {
                if (error) {
                    displayError(error.message);
                } else {
                    swal({
                        title: "Deleted!",
                        text: `Your doc <span class="text-red">[${self.username}]</span> has been deleted`,
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
    },
    'click .js-display': function (event, instance) {
        alertify.userShow(fa("eye", TAPi18n.__('core.user.title')), renderTemplate(showTmpl, this));
    }
});

// New
newTmpl.onCreated(function () {
    let self = this;
    self.autorun(function () {
        self.subscribe('core.branch');
    });
});

newTmpl.helpers({
    schema(){
        return UserSchema;
    }
});

// Edit
editTmpl.onCreated(function () {
    let self = this;
    self.autorun(function () {
        self.subscribe('core.branch');
        self.subscribe('core.user', {_id: self.data._id});
    });
});

editTmpl.helpers({
    schema(){
        return UserSchema;
    },
    data: function () {
        let self = this;
        let data = Meteor.users.findOne(self._id);
        data.email = data.emails[0].address;
        data.password = 'old&password';
        data.confirmPassword = 'old&password';

        let roles = [];
        let getGroup = Roles.getGroupsForUser(self._id);
        _.forEach(getGroup, function (group) {
            let getRole = Roles.getRolesForUser(self._id, group);
            _.forEach(getRole, function (role) {
                roles.push(group + ':' + role);
            });
        });
        data.roles = roles;

        return data;
    }
});

// Show
showTmpl.onCreated(function () {
    let self = this;
    self.autorun(function () {
        self.subscribe('cor.user', {_id: self.data._id});
    });
});

showTmpl.helpers({
    data: function () {
        let self = this;
        let data = Meteor.users.findOne(self._id);
        data.email = data.emails[0].address;

        // Check roles
        if (_.isObject(data.roles)) {
            data.roles = EJSON.stringify(data.roles);
        } else {
            data.roles = null;
        }

        // Check branch
        if (_.isObject(data.rolesBranch)) {
            data.rolesBranch = EJSON.stringify(data.rolesBranch);
        } else {
            data.rolesBranch = null;
        }

        return data;
    }
});

// Hook
AutoForm.hooks({
    Core_userNew: {
        // onSubmit: function (insertDoc, updateDoc, currentDoc) {
        //     this.event.preventDefault();
        //
        //     // Call method to add new user
        //     insertUser.call(insertDoc, function (error, result) {
        //         if (error) {
        //             sAlert.error(error.message);
        //         }
        //     });
        //
        //     this.done();
        // },
        onSuccess: function (formType, result) {
            displaySuccess();
        },
        onError: function (formType, error) {
            displayError(error.message);
        }
    },
    Core_userEdit: {
        // onSubmit: function (insertDoc, updateDoc, currentDoc) {
        //     this.event.preventDefault();
        //    
        //     updateUser.call({modifier: updateDoc, _id: currentDoc._id}, function (error, result) {
        //         if (error) {
        //             sAlert.error(error.message);
        //         }
        //     });
        //
        //     this.done();
        // },
        onSuccess: function (formType, result) {
            alertify.user().close();
            displaySuccess();
        },
        onError: function (formType, error) {
            displayError(error.message);
        }
    }
});
