Factory = {};
Factory._factories = [];

var factoryFun = function (name, collection, attributes) {
    this.name = name;
    this.collection = collection;
    this.attributes = attributes;
};

Factory.define = function (name, collection, attributes) {
    var factory = new factoryFun(name, collection, attributes);

    for (var i = 0; i < this._factories.length; i++) {
        if (this._factories[i].name === name) {
            throw new Error('A factory named ' + name + ' already exists');
        }
    }

    Factory._factories.push(factory);
};

Factory._get = function (name) {
    var factory = _.findWhere(Factory._factories, {name: name});

    if (!factory) {
        throw new Error('Could not find the factory named ' + name);
    }

    return factory;
};

Factory.create = function (name, newAttr) {
    var newAttrTmp = newAttr || {};
    var factory = this._get(name);
    var collection = factory.collection;

    // Allow to overwrite the attribute definitions
    var attr = _.merge({}, attributesPrepare(factory.attributes), attributesPrepare(newAttrTmp));

    var docId = collection.insert(attr);
    var doc = collection.findOne(docId);

    return doc;
};

Factory.build = function (name, newAttr) {
    var newAttrTmp = newAttr || {};
    newAttrTmp = attributesPrepare(newAttrTmp);

    var factory = this._get(name);
    factory.attributes = attributesPrepare(factory.attributes);

    console.log(factory.attributes);
    console.log(attributesPrepare(factory.attributes));

    var doc = _.merge({}, factory.attributes, newAttrTmp);

    console.log(doc);

    return doc;
};

// Prepare attributes for callback params
var attributesPrepare = function (attributes) {
    if (!_.isObject(attributes)) {
        throw new Error('Attributes must be object');
    }

    var tmpAttributes = {};
    _.forEach(attributes, function (val, key) {
        if (_.isFunction(val)) {
            tmpAttributes[key] = val();
        } else {
            tmpAttributes[key] = val;
        }
    });

    return tmpAttributes;
};