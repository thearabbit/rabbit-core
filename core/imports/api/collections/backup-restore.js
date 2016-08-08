import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';
import {__} from '../../../common/libs/tapi18n-callback-helper.js';

// Select opts
import {SelectOpts} from '../../ui/libs/select-opts.js';

export const BackupSchema = new SimpleSchema({
    token: {
        type: String,
        optional: true,
        defaultValue: function () {
            return userToken();
        }
    },
    module: {
        type: String,
        label: 'Module',
        autoform: {
            type: 'select',
            options: function () {
                return SelectOpts.backupRestoreModule();
            }
        }
    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: 'select'
        }
    },
    branch: {
        type: String,
        label: 'Branch',
        autoform: {
            type: 'select'
        }
    }
});

export const RestoreSchema = new SimpleSchema({
    token: {
        type: String,
        optional: true,
        defaultValue: function () {
            return userToken();
        }
    },
    module: {
        type: String,
        label: 'Module',
        autoform: {
            type: 'select',
            options: function () {
                return SelectOpts.backupRestoreModule();
            }
        }
    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: 'select'
        }
    },
    branch: {
        type: String,
        label: 'Branch',
        autoform: {
            type: 'select'
        }
    },
    restoreFile: {
        type: String,
        label: 'Restore file',
        autoform: {
            type: 'file'
        }
    },
    dropCollections: {
        type: String,
        optional: true
    },
    dropQuery: {
        type: String,
        optional: true
    }
});
