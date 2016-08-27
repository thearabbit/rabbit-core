import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';
import {_} from 'meteor/erasaur:meteor-lodash';

// Collection
import {LookupValue} from '../../imports/api/collections/lookup-value';

LookupValue.before.insert(function (userId, doc) {
    doc.options = _.compact(doc.options);
});

LookupValue.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.options = _.compact(modifier.$set.options);
});
