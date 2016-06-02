import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Item} from '../../imports/api/collections/item.js';

Item.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Item, 3);
});
