import {Meteor} from 'meteor/meteor';

import {Currency} from '../../imports/api/collections/currency.js';

Meteor.startup(function () {
    if (Currency.find().count() == 0) {
        const data = [
            {_id: 'KHR', name: 'Cambodian Riel', symbol: 'R', num: '1'},
            {_id: 'USD', name: 'United States Dollar', symbol: '$', num: '2'},
            {_id: 'THB', name: 'Thai Baht', symbol: 'B', num: '5'}
        ];

        data.forEach((list)=> {
            Currency.insert(list);
        });
    }
});