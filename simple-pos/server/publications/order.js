import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Order} from '../../imports/api/collections/order.js';

Meteor.publish('simplePos.orderById', function simpleOrder(orderId) {
    this.unblock();

    new SimpleSchema({
        orderId: {type: String}
    }).validate({selector, options});

    if (this.userId) {
        let data = Order.find({_id: orderId});

        return data;
    }

    return this.ready();
});
