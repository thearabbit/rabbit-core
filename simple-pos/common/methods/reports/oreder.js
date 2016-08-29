import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/imports/api/collections/company.js';
import {Order} from '../../../imports/api/collections/order.js';

export const orderReport = new ValidatedMethod({
    name: 'simplePos.orderReport',
    mixins: [CallPromiseMixin],
    // validate: null,
    validate: new SimpleSchema({
        orderId: {type: String}
    }).validator(),
    run({orderId}) {
        if (!this.isSimulation) {
            Meteor._sleepForMs(200);

            let data = {
                title: {},
                content: [{index: 'No Result'}],
                footer: {}
            };

            /****** Title *****/
            data.title = Company.findOne();

            /****** Content *****/
            data.content = Order.aggregate([
                {
                    $match: {_id: orderId}
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
                    $group: {
                        _id: "$_id",
                        customerId: {$last: "$customerId"},
                        customerDoc: {$last: "$customerDoc"},
                        orderDate: {$last: "$orderDate"},
                        des: {$last: "$des"},
                        branchId: {$last: "$branchId"},
                        total: {$last: "$total"},
                        items: {
                            $addToSet: {
                                itemId: "$items.itemId",
                                itemName: "$itemDoc.name",
                                qty: "$items.qty",
                                price: "$items.price",
                                amount: "$items.amount"
                            }
                        }
                    }
                }
            ])[0];

            return data
        }
    }
});
