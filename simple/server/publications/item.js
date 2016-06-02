import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Item} from '../../imports/api/collections/item.js';

Meteor.publish('simple.item', function simpleItem(selector = {}, options = {}) {
    this.unblock();
    
    new SimpleSchema({
        selector: {type: Object, blackbox: true},
        options: {type: Object, blackbox: true}
    }).validate({selector, options});

    if (this.userId) {
        let data = Item.find(selector, options);

        return data;
    }

    return this.ready();
});
