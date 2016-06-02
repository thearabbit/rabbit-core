import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Customer} from '../../imports/api/collections/customer.js';

Meteor.publish('simple.customer', function simpleCustomer(selector = {}, options = {}) {
    this.unblock();
    
    new SimpleSchema({
        selector: {type: Object, blackbox: true},
        options: {type: Object, blackbox: true}
    }).validate({selector, options});

    if (this.userId) {
        let data = Customer.find(selector, options);

        return data;
    }

    return this.ready();
});
