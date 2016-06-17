import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';
import {SelectOpts} from '../../ui/libs/select-opts.js';

export const Customer = new Mongo.Collection("simplePos_customer");

Customer.schema = new SimpleSchema({
    name: {
        type: String
    },
    gender: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.gender();
            }
        }
    },
    dob: {
        type: Date,
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
        type: String
    },
    telephone: {
        type: String
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    branchId: {
        type: String
    }
});

Meteor.startup(function () {
    Customer.schema.i18n("simplePos.customer.schema");
    Customer.attachSchema(Customer.schema);
});
