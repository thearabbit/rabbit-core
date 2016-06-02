import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Import collection
import {Company} from '../../imports/api/collections/company.js';

Meteor.publish('core.company', function coreCompany() {
    this.unblock();
    
    if (this.userId) {
        let data = Company.find();

        return data;
    }

    this.ready();
});
