import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';

// Collection
import {Customer} from '../../imports/api/collections/customer.js';

Meteor.publish('simplePos.customerById', function simpleCustomer(customerId) {
    this.unblock();

    new SimpleSchema({
        customerId: {type: String}
    }).validate({customerId});

    if (!this.userId) {
        return this.ready();
    }

    return Customer.find({_id: customerId});
});

// Reactive Table
ReactiveTable.publish("simplePos.reactiveTable.customer", Customer);