import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/common/collections/company';
import {Item} from '../../collections/item';

let tmpData = [];

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
            let getItem = Item.find({}, {sort: {parentId: 1, _id: 1}}).fetch();
            let getFirst = _.filter(getItem, function (o) {
                return _.isUndefined(o.parentId);
            });

            _.forEach(getFirst, function (o) {
                tmpData.push(getChild(o, getItem));
            });


            rptContent = tmpData;
            return {rptTitle, rptHeader, rptContent};
        }
    }
});

function getChild(data, items) {
    data.child = _.filter(items, function (o) {
        return o.parentId == o._id;
    });

    _.forEach(data.child, function (o) {
        getChild(o, items);
    });

    return data;
}