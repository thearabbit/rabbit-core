import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';
import {__} from '../../../common/libs/tapi18n-callback-helper.js';

// Lib
import {SelectOpts} from '../../ui/libs/select-opts.js';

export const UserSchema = new SimpleSchema({
    profile: {
        type: Object,
        label: __('core.user.profileLbl')
    },
    'profile.name': {
        type: String,
        label: __('core.user.fullNameLbl')
    },
    username: {
        type: String,
        label: __('core.user.usernameLbl'),
        unique: true,
        min: 3
    },
    email: {
        type: String,
        label: __('core.user.emailLbl'),
        unique: true,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        label: __('core.user.passwordLbl'),
        min: 6
    },
    confirmPassword: {
        type: String,
        label: __('core.user.confirmPasswordLbl'),
        min: 6,
        custom: function () {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        }
    },
    roles: {
        type: [String],
        label: __('core.user.rolesLbl'),
        autoform: {
            type: "select-multiple",
            //multiple: true,
            options: function () {
                return SelectOpts.role();
            }
        }
    },
    rolesBranch: {
        type: [String],
        label: __('core.user.rolesBranchLbl'),
        autoform: {
            type: "select-multiple",
            //multiple: true,
            options: function () {
                return SelectOpts.branch(false);
            }
        }
    }
});

// Custom validation
SimpleSchema.messages({
    // "passwordMismatch": "[label] don't match"
});
