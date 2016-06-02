import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {moment} from  'meteor/momentjs:moment';

export const currentServerDateTime = new ValidatedMethod({
    name: 'currentServerDateTime',
    validate: null,
    run() {
        if (!this.isSimulation) {
            return moment().toDate();
        }
    }
});
