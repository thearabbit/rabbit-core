import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Exchange} from '../../../core/common/collections/exchange';
import {Customer} from '../collections/customer.js';
import {Item} from '../collections/item.js';
import {Order} from '../collections/order.js';

export let SelectOptsMethod = {};

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
            selector.main = true;

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
            selector.main = false;

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

