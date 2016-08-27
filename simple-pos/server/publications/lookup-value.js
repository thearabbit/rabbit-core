import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {LookupValue} from '../../imports/api/collections/lookup-value.js';

Meteor.publish('simplePos.lookupValueByNames', function simpleLookupValue(lookupNames = []) {
    this.unblock();

    new SimpleSchema({
        lookupNames: {type: [String]},
    }).validate({lookupNames});

    if (!this.userId) {
        return this.ready();
    }

    Meteor._sleepForMs(200);

    return LookupValue.find({name: {$in: lookupNames}});
});
