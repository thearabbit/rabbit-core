import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Order} from '../../imports/api/collections/order.js';

Meteor.publish('simple.order', function simpleOrder(selector = {}, options = {}) {
    this.unblock();
    
    new SimpleSchema({
        selector: {type: Object, blackbox: true},
        options: {type: Object, blackbox: true}
    }).validate({selector, options});

    if (this.userId) {
        let data = Order.find(selector, options);

        return data;
    }

    return this.ready();
});
