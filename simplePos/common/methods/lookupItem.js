import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

// Collection
import {Item} from '../collections/item.js';

// Check user password
export const lookupItem = new ValidatedMethod({
    name: 'simplePos.lookupItem',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        itemId: {type: String}
    }).validator(),
    run({itemId}) {
        if (!this.isSimulation) {
            return Item.findOne({_id: itemId});
        }
    }
});