import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Item} from '../../imports/api/collections/item.js';

Meteor.publish('simplePos.itemById', function simpleItem(itemId) {
    this.unblock();

    new SimpleSchema({
        itemId: {type: String},
    }).validate({itemId});

    if (!this.userId) {
        return this.ready();
    }

    Meteor._sleepForMs(200);

    return Item.find({_id: itemId});
});
