import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Roles} from  'meteor/alanning:roles';
import {_} from 'meteor/erasaur:meteor-lodash';

// Schema
import {ProfileSchema} from '../../imports/api/collections/profile-schema.js';

// Validate schema
let validateSchema = new SimpleSchema({
    fullName: {
        type: String,
        label: 'Full name'
    },
    username: {
        type: String,
        unique: true,
        min: 3
    },
    email: {
        type: String,
        unique: true,
        regEx: SimpleSchema.RegEx.Email
    },
    oldPassword: {
        type: String,
        min: 6
    },
    newPassword: {
        type: String,
        min: 6
    },
    newConfirmPassword: {
        type: String,
        min: 6
    }
});

// Update
export const updateProfile = new ValidatedMethod({
    name: 'core.updateProfile',
    validate: new SimpleSchema({
        modifier: {
            type: validateSchema
        },
        _id: {type: String}
    }).validator(),
    run({modifier, _id}) {
        if (!this.isSimulation) {
            // if (!Roles.userIsInRole(this.userId, ['super', 'admin'], 'Core')) {
            //     throw new Meteor.Error("403", "Access denied");
            // }

            // Update account
            Meteor.users.update(_id, {
                $set: {
                    profile: {name: modifier.fullName},
                    username: modifier.username,
                    'emails.0.address': modifier.email
                }
            });
        }
    }
});
