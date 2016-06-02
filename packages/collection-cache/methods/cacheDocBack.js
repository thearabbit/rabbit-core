Mongo.Collection.prototype.cacheDocBack = function (fieldName, collection, collectionFields, refField) {
    check(fieldName, String);
    check(collection, Mongo.Collection);
    check(collectionFields, [String]);
    check(refField, String);

    var cacheField = '_' + fieldName;
    var thisCollection = this;
    var refCollection = collection;
    var fieldsToCopy = _.clone(collectionFields);
    fieldsToCopy.unshift('_id');
    fieldsToCopy = _.uniq(fieldsToCopy);

    /********** Reference Collection After Insert **********/
    refCollection.after.insert(function (userId, doc) {
        Meteor.defer(function () {
            // Set selector
            var selector = {};
            selector._id = doc[refField];

            //Fields specifier
            var cacheDocBackField = {};
            var fieldsInUpdate = {};
            _.each(fieldsToCopy, function (field) {
                fieldsInUpdate[field] = doc[field];
            });
            cacheDocBackField[cacheField] = fieldsInUpdate;

            thisCollection.direct.update(selector, {$push: cacheDocBackField});

            //console.log('Cache Doc Back->' + refCollection._name + '.after.insert()');
        });
    });

    /********** Reference Collection After Update **********/
    refCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
        Meteor.defer(function () {
            modifier.$set = modifier.$set || {};

            if (!_.difference(collectionFields, fieldNames).length) {
                // Set selector
                var selector = {};
                selector._id = modifier.$set[refField];
                selector[cacheField + '._id'] = doc._id;

                //Fields specifier
                var fieldsInUpdate = {};
                _.each(collectionFields, function (field) {
                    fieldsInUpdate[cacheField + '.$.' + field] = modifier.$set[field];
                });

                thisCollection.direct.update(selector, {$set: fieldsInUpdate});

                //console.log('Cache Doc Back->' + refCollection._name + '.after.update()');
            }
        });
    });

    /********** Reference Collection After Remove **********/
    refCollection.after.remove(function (userId, doc) {
        Meteor.defer(function () {
            // Set selector
            var selector = {};
            selector._id = doc[refField];

            //Fields specifier
            var cacheDocBackField = {};
            cacheDocBackField[cacheField] = {_id: doc._id};

            thisCollection.direct.update(selector, {$pull: cacheDocBackField});

            //console.log('Cache Doc Back->' + refCollection._name + '.after.remove()');
        });
    });
};
