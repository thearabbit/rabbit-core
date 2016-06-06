import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

// Collection
import {Item} from '../../imports/api/collections/item.js';

// Check user password
export const itemInfo = new ValidatedMethod({
    name: 'simplePos.itemInfo',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        _id: {type: String}
    }).validator(),
    run(_id) {
        if (!this.isSimulation) {
            let data = Item.findOne(_id);

            return data;
        }
    }
});