import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Method
import {SelectOptsMethod} from '../../methods/selectOptsMethod';

// Lib
import {SelectOpts} from '../../../imports/libs/selectOpts.js';

export const InvoiceSchema = new SimpleSchema({
    orderId: {
        type: String,
        label: 'Order ID',
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: 'Select One',
                optionsMethod: 'simplePos.selectOptsMethod.order',
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
