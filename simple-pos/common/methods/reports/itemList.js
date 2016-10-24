import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/common/collections/company';
import {Item} from '../../collections/item';

export const itemListReport = new ValidatedMethod({
    name: 'simplePos.itemListReport',
    mixins: [CallPromiseMixin],
    validate: null,
    run() {
        if (!this.isSimulation) {
            Meteor._sleepForMs(2000);

            let rptTitle, rptHeader, rptContent;

            // --- Title ---
            rptTitle = Company.findOne();

            // --- Content ---
            rptContent = Item.find({}, {sort: {parent: 1, _id: 1}}).fetch();

            return {rptTitle, rptHeader, rptContent};
        }
    }
});
