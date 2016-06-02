import {Meteor} from 'meteor/meteor';
import {moment} from 'meteor/momentjs:moment';

import {Branch} from '../../imports/api/collections/branch.js';
import {Exchange} from '../../imports/api/collections/exchange.js';

Meteor.startup(function () {
    if (Branch.find().count() == 0) {
        const data = {
            _id: '001',
            khName: 'បាត់ដំបង',
            khShortName: 'បប',
            enName: 'Battambang',
            enShortName: 'BTB',
            khAddress: 'ភូមិរំចេក ៤ សង្កាត់រតនៈ ក្រុងបាត់ដំបង ខេត្តបាត់ដំបង',
            enAddress: 'Romchek 4 Village, Sangkat Rottanak, Krong Battamang, Battambang Province',
            telephone: '053 50 66 777',
            email: ''
        };

        Branch.insert(data);
    }

    // Exchange
    if (Exchange.find().count() == 0) {
        let data = {
            "exDate": moment().toDate(),
            "base": "USD",
            "rates": {
                "KHR": 4000,
                "USD": 1,
                "THB": 32
            }
        };

        Exchange.insert(data);
    }
});