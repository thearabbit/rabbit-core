idGenerator = {
    gen: function (collection, length, field) {
        var field = _.isUndefined(field) ? '_id' : field;
        var newId = s.lpad(1, length, '0');
        var sortBy = {};
        sortBy[field] = -1;

        var obj = collection.findOne({}, {sort: sortBy});

        if (obj != null) {
            var tmpId = parseInt(obj[field]) + 1;
            // Check length
            if (tmpId.toString().length > length) {
                newId = null;
            } else {
                newId = s.lpad(tmpId, length, '0');
            }
        }

        return newId;
    },
    genWithPrefix: function (collection, prefix, length, field) {
        var field = _.isUndefined(field) ? '_id' : field;
        var newId = prefix + s.lpad(1, length, '0');
        var reg = {};
        reg[field] = new RegExp("^" + prefix, "m");
        var sortBy = {};
        sortBy[field] = -1;

        var obj = collection.findOne(reg, {sort: sortBy});

        if (obj != null) {
            var currentId = s(obj[field]).slice(-length).value();
            var tmpId = parseInt(currentId) + 1;

            // Check length
            if (tmpId.toString().length > length) {
                newId = null;
            } else {
                tmpId = s.lpad(tmpId, length, '0');
                newId = prefix + tmpId;
            }
        }

        return newId;
    }
};
