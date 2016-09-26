import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Item} from '../../common/collections/item.js';

Item.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Item, 3);

    // Cal item order
    if (doc.parentId) {
        let existingCount = Item.find({parentId: doc.parentId}).count();
        doc.order = (existingCount + 1) * 10;
    }
})
;
