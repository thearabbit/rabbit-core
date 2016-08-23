import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {SelectOpts} from '../../../ui/libs/select-opts.js';

export const CustomerSchema = new SimpleSchema({
    branch: {
        type: [String],
        label: 'Branch',
        autoform: {
            type: "select2",
            options: function () {
                return SelectOpts.branch(false);
                // return [
                //     {label: 'BTB', value: '001'},
                //     {label: 'BMC', value: '002'},
                // ];
            },
            afFieldInput: {
                select2Options: {
                    multiple: true
                }
            }
        }
    },
    name: {
        type: String,
        label: 'Name',
        max: 200,
        optional: true
    },
    repDate: {
        type: [Date],
        label: 'Date',
        autoform: {
            type: "bootstrap-daterangepicker",
            afFieldInput: {
                dateRangePickerOptions: function () {
                    return dateRangePickerOptions;
                }
            }
        }
    }
});
