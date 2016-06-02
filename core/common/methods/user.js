import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from  'meteor/alanning:roles';
import {_} from 'meteor/erasaur:meteor-lodash';

// Validate schema
let validateSchema = new SimpleSchema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    confirmPassword: {
        type: String
    },
    // profile: {
    //     type: Object
    // },
    'profile.name': {
        type: String
    },
    roles: {
        type: [String]
    },
    rolesBranch: {
        type: [String]
    }
});

// Insert
export const insertUser = new ValidatedMethod({
    name: 'core.insertUser',
    validate: validateSchema.validator(),
    run(doc) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }

            // Add account
            let userId = Accounts.createUser({
                username: doc.username,
                email: doc.email,
                password: doc.password,
                profile: doc.profile,
                rolesBranch: doc.rolesBranch
            });

            // Add roles
            _.each(doc.roles, function (element) {
                let roleWords = _.words(element, /[^:]+/g);
                Roles.addUsersToRoles(userId,
                    roleWords[1],
                    roleWords[0]);
            });
        }
    }
});

// Update
export const updateUser = new ValidatedMethod({
    name: 'core.updateUser',
    // validate:null,
    validate: new SimpleSchema({
        'modifier.$set': {
            type: validateSchema
        },
        _id: {type: String}
    }).validator(),
    run({modifier, _id}) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }

            let doc = modifier.$set;

            // Update account
            Meteor.users.update(_id, {
                $set: {
                    'emails.0.address': doc.email,
                    username: doc.username,
                    profile: {name: doc['profile.name']},
                    rolesBranch: doc.rolesBranch
                }
            });

            // Update password
            if (doc.password != 'old&password') {
                Accounts.setPassword(_id, doc.password);
            }
            // Update roles
            _.forEach(doc.roles, function (element) {
                let roleWords = _.words(element, /[^:]+/g);
                Roles.addUsersToRoles(_id,
                    roleWords[1],
                    roleWords[0]);
            });
        }
    }
});

// Remove
export const removeUser = new ValidatedMethod({
    name: 'core.removeUser',
    validate: new SimpleSchema({
        userId: {type: String}
    }).validator(),
    run({userId}) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }

            // Check no super
            let user = Meteor.users.findOne(userId);
            if (user.username == 'super') {
                throw new Meteor.Error("403", "Access denied");
            }

            Meteor.users.remove(userId);
        }
    }
});
