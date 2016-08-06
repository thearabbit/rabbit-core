import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ReactiveVar} from 'meteor/reactive-var';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';

// Method
import {itemInfo} from '../../../common/methods/item-info.js';

// Item schema
let defaultPrice = new ReactiveVar(0);

export const ItemsSchema = new SimpleSchema({
    itemId: {
        type: String,
        label: 'Item',
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: 'Please search... (limit 10)',
                optionsMethod: 'simplePos.selectOptMethods.item'
            }
        }
    },
    qty: {
        type: Number,
        label: 'Qty',
        min: 1,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.integer();
            }
        }
    },
    price: {
        type: Number,
        label: 'Price',
        decimal: true,
        defaultValue: function () {
            let id = AutoForm.getFieldValue('itemId');

            if (id) {
                $.blockUI();
                itemInfo.callPromise({
                    _id: id
                }).then(function (result) {
                    defaultPrice.set(result.price);

                    Meteor.setTimeout(()=> {
                        $.unblockUI();
                    }, 500);

                }).catch(function (err) {
                    console.log(err.message);
                });
            } else {
                defaultPrice.set(0);
            }

            return defaultPrice.get();
        },
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    },
    amount: {
        type: Number,
        label: 'Amount',
        decimal: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    }
});
