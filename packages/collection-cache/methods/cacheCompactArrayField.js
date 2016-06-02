Mongo.Collection.prototype.cacheCompactArrayField = function (arrayFields) {
    check(arrayFields, [String]);

    var thisCollection = this;

    /********** Before Insert This Collection **********/
    thisCollection.before.insert(function (userId, doc) {
        _.each(arrayFields, function (field) {
            // Check exist
            if (!_.isUndefined(doc[field])) {
                var items = _.compact(doc[field]);
                doc[field] = items;

                //console.log('Cache Compact Array Field->' + thisCollection._name + '.before.insert()');
            }
        });
    });

    /********** Before Update This Collection **********/
    thisCollection.before.update(function (userId, doc, fieldNames, modifier, options) {
        modifier.$set = modifier.$set || {};

        _.each(arrayFields, function (field) {
            // Check exist
            if (!_.isUndefined(modifier.$set[field])) {
                var items = _.compact(modifier.$set[field]);
                modifier.$set[field] = items;

                //console.log('Cache Compact Array Field->' + thisCollection._name + '.before.update()');
            }
        });
    });
};