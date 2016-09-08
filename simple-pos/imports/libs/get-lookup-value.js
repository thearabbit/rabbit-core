import {Meteor} from  'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

// Collection
import {LookupValue} from '../../common/collections/lookup-value';

export const getLookupValue = function (name, selectOne) {
    let list = [];
    if (selectOne) {
        list.push({label: "(Select One)", value: ""});
    }

    // Get lookup value
    let lookup = LookupValue.findOne({name: name});
    if (lookup) {
        let options = _.orderBy(lookup.options, ['order'], ['asc']);
        list = _.concat(list, options);
    }

    return list;
};