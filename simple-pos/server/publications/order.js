import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Order} from '../../imports/api/collections/order.js';

Meteor.publish('simplePos.orderById', function simpleOrder(orderId) {
    this.unblock();

    new SimpleSchema({
        orderId: {type: String}
    }).validate({orderId});

    if (!this.userId) {
        return this.ready();
    }

    return Order.find({_id: orderId});
});
