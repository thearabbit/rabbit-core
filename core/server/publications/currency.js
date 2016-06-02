import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Import collection
import {Currency} from '../../imports/api/collections/currency.js';

Meteor.publish('core.currency', function coreCurrency() {
    this.unblock();
    
    if (this.userId) {
        let data = Currency.find();

        return data;
    }

    this.ready();
});
