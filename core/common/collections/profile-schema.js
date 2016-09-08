import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const ProfileSchema = new SimpleSchema({
    fullName: {
        type: String,
        label: 'Full name'
    },
    username: {
        type: String,
        label: 'Username',
        unique: true,
        min: 3
    },
    email: {
        type: String,
        label: 'Email',
        unique: true,
        regEx: SimpleSchema.RegEx.Email
    },
    oldPassword: {
        type: String,
        label: "Old password",
        min: 6
    },
    newPassword: {
        type: String,
        label: "New password",
        min: 6
    },
    newConfirmPassword: {
        type: String,
        label: "New confirm password",
        min: 6,
        custom: function () {
            if (this.value !== this.field('newPassword').value) {
                return "passwordMismatch";
            }
        }
    }
});

// Custom validation
SimpleSchema.messages({
    // "passwordMismatch": "[label] don't match."
});
