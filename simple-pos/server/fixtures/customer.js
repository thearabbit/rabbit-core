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
                telephone: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                branchId: '001'
            };

            Customer.insert(data);
        });
    }
});