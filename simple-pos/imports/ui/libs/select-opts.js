import {Meteor} from  'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

// Collection
import {Branch} from '../../../../core/imports/api/collections/branch.js';

export const SelectOpts = {
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
    },
    contactType: function (selectOne = true) {
        let list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }
        list.push({label: "Mobile", value: "M"});
        list.push({label: "Home", value: "Home"});
        list.push({label: "Work", value: "Work"});

        return list;
    }
};