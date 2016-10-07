import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';

// Lib
import {__} from '../../../core/common/libs/tapi18n-callback-helper.js';

export const Item = new Mongo.Collection("simplePos_item");

Item.schema = new SimpleSchema({
    main: {
        type: Boolean,
        label: 'Main',
        defaultValue: true,
        autoform: {
            type: "boolean-checkbox"
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
        optional: true,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            },
            afFieldInput: {
                readonly: function () {
                    let main = AutoForm.getFieldValue('main');
                    return main || _.isUndefined(main) ? true : false;
                }
            }
        },
        custom: function () {
            if (!this.field('main').value && !this.value) {
                return 'required';
            }
        }
    },
    parent: {
        type: String,
        optional: true,
        autoform: {
            type: 'universe-select',
            afFieldInput: {
                uniPlaceholder: 'Select One',
                optionsMethod: 'simplePos.selectOptsMethod.parentItem',
                // optionsMethodParams: function () {
                //     if (Meteor.isClient) {
                //         let currentBranch = Session.get('currentBranch');
                //         return {branchId: currentBranch};
                //     }
                // }
            }
        }
    },
    ancestors: {
        type: [String],
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
