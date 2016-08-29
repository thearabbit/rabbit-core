import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

// Collection
import {Order} from '../../imports/api/collections/order';

export const lookupOrder = new ValidatedMethod({
    name: 'simplePos.lookupOrder',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        orderId: {type: String}
    }).validator(),
    run({orderId}) {
        if (!this.isSimulation) {
            Meteor._sleepForMs(200);

            let data = Order.aggregate([
                {
                    $lookup: {
                        from: "simplePos_customer",
                        localField: "customerId",
                        foreignField: "_id",
                        as: "customerDoc"
                    }
                }
            ]);

            return data[0];
        }
    }
});