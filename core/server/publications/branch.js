import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Branch} from '../../imports/api/collections/branch.js';

Meteor.publish('core.branch', function coreBranch(selector = {}, options = {}) {
    this.unblock();
    
    new SimpleSchema({
        selector: {type: Object, blackbox: true},
        options: {type: Object, blackbox: true}
    }).validate({selector, options});

    if (this.userId) {
        let data = Branch.find(selector, options);

        return data;
    }

    return this.ready();
});
