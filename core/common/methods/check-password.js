import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Check user password
export const checkPassword = new ValidatedMethod({
    name: 'checkPassword',
    validate: new SimpleSchema({
        password: {type: String}
    }).validator(),
    run({password}) {
        if (!this.isSimulation) {

            console.log(password);

            let digest = Package.sha.SHA256(password);

            let user = Meteor.user();
            let passwordOpts = {digest: digest, algorithm: 'sha-256'};
            let result = Accounts._checkPassword(user, passwordOpts);

            return result;
        }
    }
});