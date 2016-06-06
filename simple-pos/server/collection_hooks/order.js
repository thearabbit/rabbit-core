import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Order} from '../../imports/api/collections/order.js';

Order.before.insert(function (userId, doc) {
    let prefix = doc.customerId;
    doc._id = idGenerator.genWithPrefix(Order, prefix, 6);
});
