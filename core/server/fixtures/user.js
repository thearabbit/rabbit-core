import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from  'meteor/alanning:roles';


// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    if (Meteor.users.find().count() == 0) {
        // Insert super
        const superData = {
            username: 'super',
            email: 'super@rabbit.com',
            password: 'rabbitsuper',
            profile: {
                name: 'Super'
            },
            rolesBranch: ['001'] // Head Office
        };
        const superId = Accounts.createUser(superData);
        Roles.addUsersToRoles(superId, ['super'], 'Core');

        // Insert admin
        const adminData = {
            username: 'admin',
            email: 'admin@rabbit.com',
            password: '123456',
            profile: {
                name: 'Admin'
            }
        };
        const adminId = Accounts.createUser(adminData);
    }
});
