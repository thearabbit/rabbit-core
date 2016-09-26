import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';

// Lib
import {__} from '../../../core/common/libs/tapi18n-callback-helper.js';

export const Item = new Mongo.Collection("simplePos_item");

Item.schema = new SimpleSchema({
    parentId: {
        type: String,
        optional: true,
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: 'Select One',
                optionsMethod: 'simplePos.selectOptsMethod.item',
                // optionsMethodParams: function () {
                //     if (Meteor.isClient) {
                //         let currentBranch = Session.get('currentBranch');
                //         return {branchId: currentBranch};
                //     }
                // }
            }
        }
    },
    name: {
        type: String,
        unique: true,
        max: 200
    },
    price: {
        type: Number,
        decimal: true,
        min: 0,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    },
    order: {
        type: Number,
        optional: true
    },
    photo: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        }
    }
});

Meteor.startup(function () {
    Item.schema.i18n("simplePos.item.schema");
    Item.attachSchema(Item.schema);
});
