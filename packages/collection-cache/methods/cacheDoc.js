Mongo.Collection.prototype.cacheDoc = function (fieldName, collection, collectionFields, refField) {
    check(fieldName, String);
    check(collection, Mongo.Collection);
    check(collectionFields, [String]);

    var cacheField = '_' + fieldName;
    refField = _.isUndefined(refField) ? fieldName + 'Id' : refField;
    var thisCollection = this;
    var refCollection = collection;
    var fieldsToCopy = _.clone(collectionFields);

    //Fields specifier for Mongo.Collection.find
    var fieldsInFind = {_id: 0};
    _.each(fieldsToCopy, function (field) {
        fieldsInFind[field] = 1;
    });

    /********** This Collection After Insert **********/
    thisCollection.after.insert(function (userId, doc) {
        Meteor.defer(function () {
            // Get reference doc
            var selector = {
                _id: doc[refField]
            };
            var getRefDoc = refCollection.findOne(selector, {fields: fieldsInFind});

            // Check getRefDoc is undefined
            if (!_.isUndefined(getRefDoc)) {
                var fieldsInUpdate = {};
                fieldsInUpdate[cacheField] = getRefDoc;

                thisCollection.direct.update(doc._id, {$set: fieldsInUpdate});

                //console.log('Cache Doc->' + thisCollection._name + '.after.insert()');
            }
        });
    });


    /********** This Collection Before Update **********/
    thisCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
        Meteor.defer(function () {
            modifier.$set = modifier.$set || {};

            // Check ref field is updated
            if (!_.isUndefined(modifier.$set[refField])) {
                // Get new reference doc
                var selector = {
                    _id: modifier.$set[refField]
                };

                var getRefDoc = refCollection.findOne(selector, {fields: fieldsInFind});

                // Check getRefDoc is undefined
                if (!_.isUndefined(getRefDoc)) {
                    var fieldsInUpdate = {};
                    fieldsInUpdate[cacheField] = getRefDoc;

                    thisCollection.direct.update(doc._id, {$set: fieldsInUpdate});

                    //console.log('Cache Doc->' + thisCollection._name + '.after.update()');
                }
            }
        });
    });

    /********** Reference Collection After Update **********/
    refCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
        Meteor.defer(function () {
            modifier.$set = modifier.$set || {};

            // Set selector
            var selector = {};
            selector[refField] = doc._id;

            // Attach soft remove
            thisCollection.attachBehaviour('softRemovable');
            if (_.isUndefined(doc.removedAt)) {
                if (_.isUndefined(doc.restoredAt)) {
                    //Fields specifier for Mongo.Collection.update
                    var fieldsInUpdate = {};
                    fieldsInUpdate[refField] = doc._id;

                    thisCollection.update(selector, {$set: fieldsInUpdate}, {multi: true});

                    //console.log('Cache Doc->' + refCollection._name + '.after.update()');
                } else {
                    thisCollection.restore(selector);

                    //console.log('Cache Doc (Restore)->' + refCollection._name + '.after.update()');
                }
            } else {
                thisCollection.softRemove(selector);

                //console.log('Cache Doc (Soft Remove)->' + refCollection._name + '.after.update()');
            }
        });
    });

    /********** Reference Collection After Remove **********/
    refCollection.after.remove(function (userId, doc) {
        Meteor.defer(function () {
            // Set selector
            var selector = {};
            selector[refField] = doc._id;

            thisCollection.remove(selector);

            //console.log('Cache Doc->' + refCollection._name + '.after.remove()');
        });
    });
};