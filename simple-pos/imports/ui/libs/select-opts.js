import {Meteor} from  'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

// Collection
import {LookupValue} from '../../api/collections/lookup-value';
import {Branch} from '../../../../core/imports/api/collections/branch.js';

export const SelectOpts = {
    lookupValue: function (name, selectOne = true) {
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
    },
    branch: function (selectOne = true) {
        let list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }

        Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    gender: function (selectOne = true) {
        let list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: "Male", value: "M"});
        list.push({label: "Female", value: "F"});

        return list;
    }
};