import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {TAPi18n} from 'meteor/tap:i18n';
import {ReactiveVar} from 'meteor/reactive-var';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';

// Components
import '../../../client/components/loading.js';
import '../../../client/components/column-action.js';
import '../../../client/components/form-footer.js';
import {displaySuccess, displayError} from '../../../client/libs/display-alert.js';

// Collection
import {BackupSchema, RestoreSchema} from '../../api/collections/backup-restore.js';

// Select opts
import {SelectOpts} from '../libs/select-opts.js';

// Page
import './backup-restore.html';

// Declare template
let backupTmpl = Template.Core_backup,
    restoreTmpl = Template.Core_restore;

// State
let state = new ReactiveObj({
    module: '',
    type: '',
    branch: '',
    restoreIsCompleted: false
});

backupTmpl.onCreated(function () {
    let self = this;
    self.autorun(function () {
        let currentUser = Meteor.user();
        if (currentUser && currentUser.rolesBranch) {
            self.subscribe('core.branch', {_id: {$in: currentUser.rolesBranch}});
        }
    });
});

backupTmpl.helpers({
    backupSchema(){
        return BackupSchema;
    },
    type: function () {
        let module = state.get('module');
        return SelectOpts.backupRestoreType(module);
    },
    branch: function () {
        let type = state.get('type');
        return SelectOpts.backupRestoreBranch(type);
    }
});

backupTmpl.events({
    'change [name="module"]': function (e, t) {
        let module = $(e.currentTarget).val();
        state.set('module', module);
    },
    'change [name="type"]': function (e, t) {
        let type = $(e.currentTarget).val();
        state.set('type', type);
    }
});

// Hook
AutoForm.hooks({
    Core_backup: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            this.done(null, insertDoc);
        },
        onSuccess: function (formType, result) {
            let dumpUrl, filename, collections, query, module, type, branch;
            module = result.module;
            type = result.type;
            branch = result.branch;

            dumpUrl = '/appDump?';

            collections = [];
            if (module != 'All') {
                if (type != 'all') {
                    collections = Module[module]['dump'][type];
                } else { // all
                    _.each(Module[module]['dump'], function (type) {
                        _.each(type, function (col) {
                            collections.push(col);
                        });
                    });
                }
            }

            query = {};
            if (branch != 'all') {
                query.branchId = branch;
            }
            filename = module + '_' + type + '_' + branch;

            dumpUrl += 'token=' + result.token;
            dumpUrl += '&filename=' + filename;
            dumpUrl += '&collections=' + collections;
            dumpUrl += '&query=' + JSON.stringify(query);

            // console.log(dumpUrl);

            window.location.href = dumpUrl;
        },
        onError: function (formType, error) {
            displayError(error.message);
        }
    }
});

/**
 * Restore
 */
let restoreWaiting = new ReactiveVar(false);

restoreTmpl.onCreated(function () {
    let self = this;
    self.autorun(function () {
        let currentUser = Meteor.user();
        if (currentUser && currentUser.rolesBranch) {
            self.subscribe('core.branch', {_id: {$in: currentUser.rolesBranch}});
        }

        // Check restore is completed
        if (state.get('restoreIsCompleted')) {
            $.unblockUI();

            swal({
                title: "Success",
                text: 'Restore is successful!',
                type: "success",
                allowEscapeKey: false,
                showCloseButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Please login again...',
                allowOutsideClick: false,
                // timer: 1000
            }).then(function () {
                // Go to login page
                FlowRouter.go('core.welcome');

                // Logout
                Meteor.logout();

                // Clear Session
                Session.clear();
                // Session.clearPersistent();

                // Reload page
                document.location.reload(true);
            }).done();
        }

    });
});

restoreTmpl.helpers({
    restoreSchema(){
        return RestoreSchema;
    },
    restoreWaiting: function () {
        return restoreWaiting.get();
    },
    type: function () {
        let module = state.get('module');
        return SelectOpts.backupRestoreType(module);
    },
    branch: function () {
        let type = state.get('type');
        return SelectOpts.backupRestoreBranch(type);
    },
    dropCollections: function () {
        let value = false;
        let module = state.get('module');
        let type = state.get('type');

        if (!_.isEmpty(module)) {
            if (module == 'All') {
                value = true;
            } else {
                // Check type
                if (type == 'all') {
                    let colsList = [];
                    _.each(Module[module].dump, function (cols) {
                        _.each(cols, function (col) {
                            colsList.push(col);
                        })
                    });
                    value = colsList;
                } else {
                    value = Module[module]['dump'][type];
                }
            }
        } else {
            value = false;
        }

        return value;
    },
    dropQuery: function () {
        let value = {};
        let branch = state.get('branch');

        if (_.isEmpty(branch) || branch == 'all') {
            value = {};
        } else {
            value = {branchId: branch};
        }

        return JSON.stringify(value);
    }
});

restoreTmpl.events({
    'change [name="module"]': function (e, t) {
        let module = $(e.currentTarget).val();
        state.set('module', module);
    },
    'change [name="type"]': function (e, t) {
        let type = $(e.currentTarget).val();
        state.set('type', type);
    },
    'change [name="branch"]': function (e, t) {
        let branch = $(e.currentTarget).val();
        state.set('branch', branch);
    }
});

// Hook
AutoForm.hooks({
    Core_restore: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            // $.blockUI();

            this.event.preventDefault();

            let $form, formData;
            $form = $('#Core_restore');
            formData = new FormData($form[0]);

            let restoreFile = insertDoc.restoreFile;
            let filename = (restoreFile.split('\\').pop().split('/').pop().split('.'))[0];
            let filenameArr = filename.split('_');

            let module = filenameArr[0];
            let type = filenameArr[1];
            let branch = filenameArr[2];

            /***** Check file name *****/
            if (insertDoc.module != module || insertDoc.type != type || insertDoc.branch != branch) {
                displayError('Restore file name don\'t match');
                return false;
            }

            this.done(null, formData);
        },
        onSuccess: function (formType, result) {
            $.blockUI();

            $.ajax({
                type: 'POST',
                url: '/app-dump',
                data: result,
                cache: false,
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false
            }).done((data)=> {
                console.log('Restore is complete');

                state.set('restoreIsCompleted', true);
            }).fail((err)=> {
                console.log('Error restore: ' + err.responseText);
            });

        },
        onError: function (formType, error) {
            displayError(error.message);
        }
    }
});
