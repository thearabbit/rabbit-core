import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Item} from '../../common/collections/item.js';

Item.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Item, 2);

    // Get ancestors
    if (doc.parent) {
        let getAncestors = Item.findOne({_id: doc.parent});
        let ancestors = getAncestors.ancestors || [];
        ancestors.push(doc.parent);

        doc.ancestors = ancestors;
    }
});

Item.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    // Get ancestors
    if (modifier.$set.parent) {
        let getAncestors = Item.findOne({_id: modifier.$set.parent});
        let ancestors = getAncestors.ancestors || [];
        ancestors.push(modifier.$set.parent);

        modifier.$set.ancestors = ancestors;
    }
});

