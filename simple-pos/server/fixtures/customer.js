import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';
import casual from 'casual';
import faker from 'faker';

import {Customer} from '../../imports/api/collections/customer.js';

Meteor.startup(function () {
    if (Customer.find().count() == 0) {
        _.times(100, ()=> {
            const data = {
                name: faker.name.findName(),
                gender: faker.random.arrayElement(['M', 'F']),
                dob: faker.date.past(),
                address: faker.address.city(),
                email: faker.internet.email(),
                contact: faker.random.arrayElement([
                    [{type: 'W', number: '053 506-3777'}],
                    [{type: 'M', number: '070 550-880'}],
                    [{type: 'H', number: '011 880-550'}],
                ]),
                branchId: '001'
            };

            Customer.insert(data);
        });
    }
});