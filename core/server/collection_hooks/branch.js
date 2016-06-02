import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';

// Collection
import {Branch} from '../../imports/api/collections/branch.js';

Branch.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Branch, 3);
});
