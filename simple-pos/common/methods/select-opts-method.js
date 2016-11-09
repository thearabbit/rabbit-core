import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Exchange} from '../../../core/common/collections/exchange';
import {Customer} from '../collections/customer';
import {Item} from '../collections/item';
import {Location} from '../collections/location';
import {Order} from '../collections/order';

export let SelectOptsMethod = {};

// Location
SelectOptsMethod.location = new ValidatedMethod({
    name: 'simplePos.selectOptsMethod.location',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            let list = [], selector = {};
            let searchText = options.searchText;
            let values = options.values;
            let params = options.params || {};

            if (searchText) {
                selector = {
                    $or: [
                        {code: {$regex: searchText, $options: 'i'}},
                        {name: {$regex: searchText, $options: 'i'}}
                    ],
                };
            } else if (values.length) {
                selector = {_id: {$in: values}};
            }
            _.assignIn(selector, params);

            let data = Location.aggregate([
                {
                    $match: selector
                },
                {
                    $limit: 10
                },
                {
                    $unwind: {path: "$ancestors", preserveNullAndEmptyArrays: true}
                },
                {
                    $lookup: {
                        from: "simplePos_location",
                        localField: "ancestors",
                        foreignField: "_id",
                        as: "ancestorsDoc"
                    }
                },
                {
                    $unwind: {path: "$ancestorsDoc", preserveNullAndEmptyArrays: true}
                },
                {
                    $group: {
                        _id: "$_id",
                        type: {$first: "$type"},
                        parent: {$first: "$parent"},
                        code: {$first: "$code"},
                        name: {$first: "$name"},
                        ancestorsDoc: {$push: "$ancestorsDoc.name"}
                    }
                }
            ]);

            data.forEach(function (value) {
                let label = `${value.code} : `;
                if (_.compact(value.ancestorsDoc).length > 0) {
                    _.forEach(value.ancestorsDoc, (o)=> {
                        label += o + ', ';
                    })
                }
                label += value.name;

                list.push({label: label, value: value._id});
            });

            return list;
        }
    }
});

// Item
SelectOptsMethod.parentItem = new ValidatedMethod({
    name: 'simplePos.selectOptsMethod.parentItem',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            let list = [], selector = {};
            let searchText = options.searchText;
            let values = options.values;

            if (searchText) {
                selector = {
                    $or: [
                        {_id: {$regex: searchText, $options: 'i'}},
                        {name: {$regex: searchText, $options: 'i'}}
                    ]
                };
            } else if (values.length) {
                selector = {_id: {$in: values}};
            }
            selector.type = 'P';

            let data = Item.find(selector, {limit: 10});
            data.forEach(function (value) {
                let label = `${value._id} : ${value.name}`;
                if (value.ancestors) {
                    let getAncestors = Item.find({_id: {$in: value.ancestors}}, {sort: {_id: 1}}).fetch();
                    label += ' [' + _.map(getAncestors, (o)=> {
                            return o.name;
                        }) + ']';
                }

                list.push({label: label, value: value._id});
            });

            return list;
        }
    }
});

SelectOptsMethod.customer = new ValidatedMethod({
    name: 'simplePos.selectOptsMethod.customer',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            let list = [], selector = {};
            let searchText = options.searchText;
            let values = options.values;
            let params = options.params || {};

            if (searchText && params.branchId) {
                selector = {
                    $or: [
                        {_id: {$regex: searchText, $options: 'i'}},
                        {name: {$regex: searchText, $options: 'i'}}
                    ],
                    branchId: params.branchId
                };
            } else if (values.length) {
                selector = {_id: {$in: values}};
            }

            let data = Customer.find(selector, {limit: 10});
            data.forEach(function (value) {
                let label = value._id + ' : ' + value.name;
                list.push({label: label, value: value._id});
            });

            return list;
        }
    }
});

SelectOptsMethod.orderItem = new ValidatedMethod({
    name: 'simplePos.selectOptsMethod.orderItem',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            let list = [], selector = {};
            let searchText = options.searchText;
            let values = options.values;

            if (searchText) {
                selector = {
                    $or: [
                        {_id: {$regex: searchText, $options: 'i'}},
                        {name: {$regex: searchText, $options: 'i'}}
                    ]
                };
            } else if (values.length) {
                selector = {_id: {$in: values}};
            }
            selector.type = 'C';

            let data = Item.find(selector, {limit: 10});
            data.forEach(function (value) {
                let label = `${value._id} : ${value.name}`;
                if (value.ancestors) {
                    let getAncestors = Item.find({_id: {$in: value.ancestors}}, {sort: {_id: 1}}).fetch();
                    label += ' [' + _.map(getAncestors, (o)=> {
                            return o.name;
                        }) + ']';
                }

                list.push({label: label, value: value._id});
            });

            return list;
        }
    }
});

SelectOptsMethod.order = new ValidatedMethod({
    name: 'simplePos.selectOptsMethod.order',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            let list = [], selector = {};
            let searchText = options.searchText;
            let values = options.values;

            if (searchText) {
                selector = {
                    _id: {$regex: searchText, $options: 'i'},
                    branchId: params.branchId
                };
            } else if (values.length) {
                selector = {_id: {$in: values}};
            }

            let data = Order.find(selector, {limit: 10});
            data.forEach(function (value) {
                let label = `${value._id} | Date: ` + moment(value.orderDate).format('DD/MM/YYYY') + ` | Amount: ` + numeral(value.total).format('0,0.00');
                list.push({label: label, value: value._id});
            });

            return list;
        }
    }
});

SelectOptsMethod.exchange = new ValidatedMethod({
    name: 'simplePos.selectOptsMethod.exchange',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            let list = [], selector = {};
            let searchText = options.searchText;
            let values = options.values;

            if (searchText) {
                selector = {$text: {$search: searchText}};
            } else if (values.length) {
                selector = {_id: {$in: values}};
            }

            let data = Exchange.find(selector, {limit: 10});
            data.forEach(function (value) {
                var label = moment(value.exDate).format('DD/MM/YYYY') +
                    ' | ' + numeral(value.rates.USD).format('0,0.00') + ' $' +
                    ' = ' + numeral(value.rates.KHR).format('0,0.00') + ' ៛' + ' = ' +
                    numeral(value.rates.THB).format('0,0.00') + ' B';

                list.push({label: label, value: value._id});
            });

            return list;
        }
    }
});

