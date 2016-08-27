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
                if (Module[group]) {
                    let label = Module[group].name;
                    list.push({label: label, value: group});
                }
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
    currency: function (selectOne = true) {
        let list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }

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
    }
    ,
    role: function () {
        let list = [];

        _.forEach(Module, function (val, key) {
            let options = [];

            _.forEach(Module[key].roles, function (roleVal) {
                // Check super user
                if (Meteor.user().username == 'super') {
                    options.push({label: roleVal, value: key + ':' + roleVal});
                } else {
                    if (!(key == 'Core' && roleVal == 'super')) {
                        options.push({label: roleVal, value: key + ':' + roleVal});
                    }
                }
            });

            list.push({optgroup: key, options: options});
        });

        return list;
    },
    backupRestoreModule: function () {
        let userId = Meteor.userId(),
            currentModule = Session.get('currentModule'),
            list = [];
        // list.push({label: "(Select One)", value: ""});

        if (currentModule == 'Core') {
            list.push({label: "- All -", value: "All"});
            Roles.getGroupsForUser(userId)
                .forEach(function (group) {
                    if (Module[group]) {
                        let label = Module[group].name;
                        list.push({label: label, value: group});
                    }
                });
        } else {
            if (Module[currentModule]) {
                let label = Module[currentModule].name;
                list.push({label: label, value: currentModule});
            }
        }

        return list;
    },
    backupRestoreType: function (module) {
        let list = [];

        if (!_.isEmpty(module)) {
            if (module == 'All' || module == 'Core') {
                list.push({label: '- All -', value: 'all'});
            } else {
                //list.push({label: '- All -', value: 'all'});
                if (Module[module]) {
                    _.each(Module[module].dump, function (val, key) {
                        list.push({label: key, value: key});
                    });
                }
            }
        }
        // list.unshift({label: '(Select One)', value: ''});

        return list;
    },
    backupRestoreBranch: function (type) {
        let currentModule = Session.get('currentModule'),
            currentBranch = Session.get('currentBranch'),
            list = [];

        if (!_.isEmpty(type)) {
            // Check current module
            if (type == 'all' || type == 'setting') {
                list.push({label: '- All -', value: 'all'});
            } else {
                if (Meteor.user() && Meteor.user().rolesBranch) {
                    _.each(Meteor.user().rolesBranch, function (branch) {
                        let getBranch = Branch.findOne(branch);
                        list.push({label: getBranch.enName, value: getBranch._id});
                    });
                }
            }
        }
        // list.unshift({label: '(Select One)', value: ''});

        return list;
    }
};