// Reactive List
ReactiveList = function () {
    var self = this;
    // Object container
    self.lookup = {};

    // Rig the dependencies
    self._lookupDep = new Deps.Dependency();
};

// Insert
ReactiveList.prototype.insert = function (key, value, duplicate) {
    var self = this;

    // Generate index
    var index = 0;
    var lookupMap = _.map(self.lookup);
    if (lookupMap.length > 0) {
        index = parseInt(_.last(lookupMap).index) + 1;
    }

    // Check value is object
    var keyStr = _.isString(key) ? key : JSON.stringify(key);
    if (_.isObject(self.lookup[keyStr])) {
        throw new Error('Value must be an object ({}).');
    }

    // Check key is exist
    duplicate = _.isUndefined(duplicate) ? false : duplicate;
    if (duplicate === false) {
        if (!_.isUndefined(self.lookup[keyStr])) {
            throw new Error('Reactive list could not insert: key "' + key + '" already found.');
        }
    }
    _.defaults(value, {index: index});

    self.lookup[keyStr] = value;

    self._lookupDep.changed();
};

// Update
ReactiveList.prototype.update = function (key, value) {
    var self = this;

    // Check value is object
    if (!_.isObject(value)) {
        throw new Error('Value must be an object ({...}).');
    }

    // Check key is exist
    var keyStr = _.isString(key) ? key : JSON.stringify(key);
    var defaults = self.lookup[keyStr];
    if (_.isUndefined(defaults)) {
        throw new Error('Reactive list could not update: key "' + key + '" not found.');
    }
    _.defaults(value, defaults);

    self.lookup[keyStr] = value;

    self._lookupDep.changed();
};

// Remove
ReactiveList.prototype.remove = function (key) {
    var self = this;
    var keyStr = _.isString(key) ? key : JSON.stringify(key);

    // Check key is exist
    if (_.isUndefined(self.lookup[keyStr])) {
        throw new Error('Reactive list could not remove: key "' + key + '" not found.');
    }

    delete self.lookup[keyStr];

    self._lookupDep.changed();
};

// Clear
ReactiveList.prototype.clear = function () {
    var self = this;
    self.lookup = {};

    self._lookupDep.changed();
};

// Fetch
ReactiveList.prototype.fetch = function () {
    var self = this;
    var lookupMap = _.map(self.lookup);
    self._lookupDep.depend();

    return lookupMap;
};

// Fetch and reverse
ReactiveList.prototype.fetchReverse = function () {
    var self = this;
    var lookupMap = _.map(self.lookup);
    self._lookupDep.depend();

    return lookupMap.reverse();
};

// First
ReactiveList.prototype.first = function () {
    var self = this;
    self._lookupDep.depend();
    var lookupMap = _.map(self.lookup);

    return _.first(lookupMap);
};

// Last
ReactiveList.prototype.last = function () {
    var self = this;
    self._lookupDep.depend();
    var lookupMap = _.map(self.lookup);

    return _.last(lookupMap);
};

// Length
ReactiveList.prototype.length = function () {
    var self = this;
    self._lookupDep.depend();
    var lookupMap = _.map(self.lookup);

    return lookupMap.length;
};

// Get by id
ReactiveList.prototype.get = function (key) {
    var self = this;
    self._lookupDep.depend();

    // Check key is exist
    var keyStr = _.isString(key) ? key : JSON.stringify(key);
    //if (_.isUndefined(self.lookup.get(keyStr))) {
    //    throw new Error('Reactive list could not get: key "' + key + '" not found.');
    //}

    return self.lookup[keyStr];
};
