Mongo.Collection.prototype.cacheTimestamp = function () {
    var thisCollection = this;

    /********** Before Insert **********/
    thisCollection.before.insert(function (userId, doc) {
        doc.createdAt = new Date();
        doc.createdBy = userId;

        //console.log('Cache Timestamp->' + thisCollection._name + '.before.insert()');
    });

    /********** Before Update **********/
    thisCollection.before.update(function (userId, doc, fieldNames, modifier, options) {
        modifier.$set = modifier.$set || {};
        modifier.$set.updatedAt = new Date();
        modifier.$set.updatedBy = userId;

        //console.log('Cache Timestamp->' + thisCollection._name + '.before.update()');
    });
};