import {Accounts} from 'meteor/accounts-base';

// Add new custom field
Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile;
    user.rolesBranch = options.rolesBranch;
    
    return user;
});
