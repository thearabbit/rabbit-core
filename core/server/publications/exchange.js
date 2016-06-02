import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Import collection
import {Exchange} from '../../imports/api/collections/exchange.js';

Meteor.publish('core.exchange', function coreExchange(selector = {}, options = {}) {
    this.unblock();

    if (this.userId) {
        new SimpleSchema({
            selector: {type: Object, blackbox: true},
            options: {type: Object, blackbox: true}
        }).validate({selector, options});

        let data = Exchange.find(selector, options);

        return data;
    }

    this.ready();
});
