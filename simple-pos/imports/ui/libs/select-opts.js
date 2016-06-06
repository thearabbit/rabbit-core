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
    gender: function () {
        let list = [
            {label: "(Select One)", value: ""},
            {label: "Male", value: "M"},
            {label: "Female", value: "F"}
        ];

        return list;
    }
};