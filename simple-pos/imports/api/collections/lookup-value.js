import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Lib
import {SelectOpts} from '../../ui/libs/select-opts.js';

export const LookupValue = new Mongo.Collection("simplePos_lookupValue");

LookupValue.schema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        unique: true,
        max: 250
    },
    private: {
        type: Boolean,
        label: 'Private',
        defaultValue: false,
        autoform: {
            type: "boolean-checkbox"
        }
    },
    options: {
        type: Array,
        minCount: 1
    },
    'options.$': {
        type: Object
    },
    'options.$.value': {
        type: String,
        max: 100
    },
    'options.$.label': {
        type: String,
        max: 250
    },
    'options.$.order': {
        type: Number,
        defaultValue: 0,
        min: 0
    }
});

LookupValue.attachSchema(LookupValue.schema);
