/**
 * Check relation
 */
relationExist = function (objects) {

    //var objects = [
    //    {collection: App.Collection.Test, selector: {_id: "001"}},
    //    {collection: App.Collection.Test2, selector: {_id: "002"}}
    //];
    var getObjects = _.isArray(objects) ? objects : [];

    var exist = false;
    getObjects.forEach(function (obj) {
        var getRelation = obj.collection.findOne(obj.selector);
        if (getRelation != null) {
            exist = true;
            return;
        }
    });

    return exist;

};