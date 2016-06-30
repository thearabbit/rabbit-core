import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Item} from '../../imports/api/collections/item.js';

Meteor.publish('simplePos.itemById', function simpleItem(itemId) {
    this.unblock();

    new SimpleSchema({
        itemId: {type: String},
    }).validate({selector, options});

    if (this.userId) {
        let data = Item.find({_id: itemId});

        return data;
    }

    return this.ready();
});
