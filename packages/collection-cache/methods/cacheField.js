Mongo.Collection.prototype.cacheField = function (fieldName, collectionFields, valueFunction) {
    var value;
    if (_.isUndefined(valueFunction)) {
        value = function (doc, fields) {
            var glue = ', ';
            return _.compact(_.map(fields, function (field) {
                return doc[field];
            })).join(glue);
        };
    } else {
        value = valueFunction;
    }

    check(fieldName, String);
    check(collectionFields, [String]);
    check(value, Function);


    var cacheField = '_' + fieldName;
    var thisCollection = this;

    /********** After Insert This Collection **********/
    thisCollection.after.insert(function (userId, doc) {
        Meteor.defer(function () {
            var fieldsInUpdate = {};
            fieldsInUpdate[cacheField] = value(doc, collectionFields);

            thisCollection.direct.update(doc._id, {$set: fieldsInUpdate});

            //console.log('Cache Field->' + thisCollection._name + '.after.insert()');
        })
    });

    /********** Before Update This Collection **********/
    thisCollection.after.update(function (userId, doc, fieldNames, modifier, options) {
        Meteor.defer(function () {
            modifier.$set = modifier.$set || {};

            if (!_.difference(collectionFields, fieldNames).length) {
                var fieldsInUpdate = {};
                fieldsInUpdate[cacheField] = value(modifier.$set, collectionFields);

                thisCollection.direct.update(doc._id, {$set: fieldsInUpdate});

                //console.log('Cache Field->' + thisCollection._name + '.after.update()');
            }
        });
    });
};