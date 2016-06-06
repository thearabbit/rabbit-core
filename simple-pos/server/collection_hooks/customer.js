import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Customer} from '../../imports/api/collections/customer.js';

Customer.before.insert(function (userId, doc) {
    let prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Customer, prefix, 6);
});
