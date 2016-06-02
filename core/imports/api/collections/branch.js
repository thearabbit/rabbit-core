import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';
import {__} from '../../../common/libs/tapi18n-callback-helper.js';

export const Branch = new Mongo.Collection("core_branch");

Branch.schema = new SimpleSchema({
    khName: {
        type: String,
        label: __('core.branch.khNameLbl'),
        unique: true,
        max: 200
    },
    khShortName: {
        type: String,
        label: __('core.branch.khShortNameLbl'),
        unique: true,
        max: 200
    },
    enName: {
        type: String,
        label: __('core.branch.enNameLbl'),
        unique: true,
        max: 200
    },
    enShortName: {
        type: String,
        label: __('core.branch.enShortNameLbl'),
        unique: true,
        max: 200
    },
    khAddress: {
        type: String,
        label: __('core.branch.khAddressLbl')
    },
    enAddress: {
        type: String,
        label: __('core.branch.enAddressLbl')
    },
    telephone: {
        type: String,
        label: __('core.branch.telephoneLbl'),
        max: 100,
        optional: true
    },
    email: {
        type: String,
        label: __('core.branch.emailLbl'),
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    }
});

Branch.attachSchema(Branch.schema);
