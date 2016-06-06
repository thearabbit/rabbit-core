import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {SelectOpts} from '../../../ui/libs/select-opts.js';

export const OrderSchema = new SimpleSchema({
    orderId: {
        type: String,
        label: 'Order id',
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: 'Select One',
                optionsMethod: 'simplePos.selectOptMethods.order',
                optionsMethodParams: function () {
                    if (Meteor.isClient) {
                        let currentBranch = Session.get('currentBranch');
                        return {branchId: currentBranch};
                    }
                }
            }
        }
    }
});
