import  {Accounts} from 'meteor/accounts-base';

userToken = function () {
    let token = typeof Accounts !== 'undefined' && Accounts !== null ? Accounts._storedLoginToken() : null;
    return token;
};
