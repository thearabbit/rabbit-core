import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';
import {SelectOpts} from '../../ui/libs/select-opts.js';

export const Customer = new Mongo.Collection("simple_customer");

Customer.schema = new SimpleSchema({
    name: {
        type: String,
        label: __('simple.customer.nameLbl')
    },
    gender: {
        type: String,
        label: __('simple.customer.genderLbl'),
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.gender();
            }
        }
    },
    dob: {
        type: Date,
        label: __('simple.customer.dobLbl'),
        defaultValue: moment().toDate(),
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker",
                dateTimePickerOptions: {
                    format: 'DD/MM/YYYY',
                    pickTime: false,
                    showToday: true
                }
            }
        }
    },
    address: {
        type: String,
        label: __('simple.customer.addressLbl')
    },
    telephone: {
        type: String,
        label: __('simple.customer.telephoneLbl')
    },
    email: {
        type: String,
        label: __('simple.customer.emailLbl'),
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    branchId: {
        type: String
    }
});

Customer.attachSchema(Customer.schema);
