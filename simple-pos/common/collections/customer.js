import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {__} from '../../../core/common/libs/tapi18n-callback-helper.js';
import {SelectOpts} from '../../imports/libs/select-opts.js';
import {getLookupValue} from '../../imports/libs/get-lookup-value.js';

export const Customer = new Mongo.Collection("simplePos_customer");

Customer.generalSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    gender: {
        type: String,
        label: 'Gender',
        defaultValue: 'M',
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return getLookupValue('Gender');
            }
        }
    },
    dob: {
        type: Date,
        label: 'Date of birth',
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    showTodayButton: true
                }
            }
        }
    },
    address: {
        type: String,
        label: 'Address'
    },
    email: {
        type: String,
        label: 'Email',
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    branchId: {
        type: String
    }
});

Customer.contactSchema = new SimpleSchema({
    contact: {
        type: [Object],
        label: 'Contact',
        minCount: 1,
        maxCount: 3
    },
    'contact.$.type': {
        type: String,
        label: 'Type',
        autoform: {
            type: "select",
            options: function () {
                return getLookupValue('Contact Type');
            }
        }
    },
    'contact.$.number': {
        type: String,
        label: 'Number',
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.phone();
            }
        }
    },
});

Customer.attachSchema([
    Customer.generalSchema,
    Customer.contactSchema
]);
