import {Meteor} from  'meteor/meteor';
import {Roles} from  'meteor/alanning:roles';
import {_} from 'meteor/erasaur:meteor-lodash';

// Collection
import {Branch} from '../../api/collections/branch.js';
import {Currency} from '../../api/collections/currency.js';

export const SelectOpts = {
    roleForCurrentUser: function () {
        let list = [];
        list.push({label: "(Select One)", value: ""});

        Roles.getGroupsForUser(Meteor.userId())
            .forEach(function (group) {
                let label = Module[group].name;
                list.push({label: label, value: group});
            });

        return list;
    },
    branchForCurrentUser: function (selectOne = true) {
        let list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }

        if (Meteor.user() && Meteor.user().rolesBranch) {
            let rolesBranch = Meteor.user().rolesBranch;
            let branches = Branch.find({_id: {$in: rolesBranch}}, {sort: {_id: 1}});

            branches.forEach(function (branch) {
                list.push({label: branch.enName, value: branch._id});
            });
        }

        return list;
    },
    currency: function () {
        let list = [{label: "(Select One)", value: ""}];
        Currency.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' (' + obj.num + ')', value: obj._id})
            });

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
    role: function () {
        let list = [];

        _.forEach(Module, function (val, key) {
            let options = [];

            _.forEach(Module[key].roles, function (roleVal) {
                if (!(key == 'Core' && roleVal == 'super')) {
                    options.push({label: roleVal, value: key + ':' + roleVal});
                }
            });

            list.push({optgroup: key, options: options});
        });

        return list;
    },
};