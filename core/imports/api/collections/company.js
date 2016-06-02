import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {TAPi18n} from 'meteor/tap:i18n';
import {__} from '../../../common/libs/tapi18n-callback-helper.js';

export const Company = new Mongo.Collection('core_company');

Company.schema = new SimpleSchema({
    khName: {
        type: String,
        label: __('core.company.khNameLbl'),
        max: 200
    },
    khShortName: {
        type: String,
        label: __('core.company.khShortNameLbl'),
        max: 200
    },
    enName: {
        type: String,
        label: __('core.company.enNameLbl'),
        max: 200
    },
    enShortName: {
        type: String,
        label: __('core.company.enShortNameLbl'),
        max: 200
    },
    khAddress: {
        type: String,
        label: __('core.company.khAddressLbl'),
        max: 500
    },
    enAddress: {
        type: String,
        label: __('core.company.enAddressLbl'),
        max: 500
    },
    telephone: {
        type: String,
        label: __('core.company.telephoneLbl'),
        max: 100
    },
    email: {
        type: String,
        label: __('core.company.emailLbl'),
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    website: {
        type: String,
        label: __('core.company.websiteLbl'),
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    }
});

Company.attachSchema(Company.schema);
