import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {AutoForm} from 'meteor/aldeed:autoform';

// Lib
import {__} from '../../../../core/common/libs/tapi18n-callback-helper.js';

export const Item = new Mongo.Collection("simple_item");

Item.schema = new SimpleSchema({
    name: {
        type: String,
        label: __('simple.item.nameLbl'),
        unique: true,
        max: 200
    },
    price: {
        type: Number,
        label: __('simple.item.priceLbl'),
        decimal: true,
        min: 0.01,
        autoform: {
            type: 'inputmask',
            inputmaskOptions: function () {
                return inputmaskOptions.currency();
            }
        }
    },
    photo: {
        type: String,
        label: __('simple.item.photoLbl'),
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

Item.attachSchema(Item.schema);
