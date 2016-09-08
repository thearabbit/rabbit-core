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
                    $match: {_id: orderId}
                },
                {
                    $lookup: {
                        from: "simplePos_customer",
                        localField: "customerId",
                        foreignField: "_id",
                        as: "customerDoc"
                    }
                },
                {
                    $unwind: "$customerDoc"
                },
                {
                    $unwind: "$items"
                },
                {
                    $lookup: {
                        from: "simplePos_item",
                        localField: "items.itemId",
                        foreignField: "_id",
                        as: "itemDoc"
                    }
                },
                {
                    $unwind: "$itemDoc"
                },
                {
                    $project: {
                        _id: 1,
                        orderDate: 1,
                        customerId: 1,
                        customerDoc: 1,
                        des: 1,
                        branchId: 1,
                        total: 1,
                        items: 1,
                        itemsDoc: 1,
                        itemLabel: {$concat: ["$itemDoc._id", " : ", "$itemDoc.name"]}
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        orderDate: {$last: "$orderDate"},
                        customerId: {$last: "$customerId"},
                        customerDoc: {$last: "$customerDoc"},
                        des: {$last: "$des"},
                        branchId: {$last: "$branchId"},
                        total: {$last: "$total"},
                        items: {
                            $addToSet: {
                                _id: "$items.itemId",
                                itemId: "$items.itemId",
                                itemLabel: "$itemLabel",
                                qty: "$items.qty",
                                price: "$items.price",
                                amount: "$items.amount"
                            }
                        }
                    }
                }
            ]);

            return data[0];
        }
    }
});