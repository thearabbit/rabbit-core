import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {Item} from '../../imports/api/collections/item.js';

Meteor.startup(function () {
    if (Item.find().count() == 0) {
        const data = [
            {_id: '001', name: 'Apple', price: 10},
            {_id: '002', name: 'Bal', price: 15},
            {_id: '003', name: 'Cat', price: 12},
            {_id: '004', name: 'Dog', price: 20},
            {_id: '005', name: 'Elephant', price: 50},
        ];

        _.forEach(data, (value)=> {
            Item.insert(value);
        });
    }
});