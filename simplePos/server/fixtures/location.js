import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';
import casual from 'casual';
import faker from 'faker';

import {Location} from '../../common/collections/location';

Meteor.startup(function () {
    if (Location.find().count() == 0) {
        const data = [
            /* 1 */
            {
                "_id": "00000001",
                "type": "P",
                "code": "02",
                "khName": "បាត់ដំបង",
                "enName": "Battambang"
            },

            /* 2 */
            {
                "_id": "00000002",
                "type": "D",
                "parent": "00000001",
                "code": "0201",
                "khName": "សង្កែ",
                "enName": "Sangke",
                "ancestors": [
                    "00000001"
                ]
            },

            /* 3 */
            {
                "_id": "00000003",
                "type": "C",
                "parent": "00000002",
                "code": "020101",
                "khName": "អូរដំបង១",
                "enName": "Odambang I",
                "ancestors": [
                    "00000001",
                    "00000002"
                ]
            },

            /* 4 */
            {
                "_id": "00000004",
                "type": "V",
                "parent": "00000003",
                "code": "02010101",
                "khName": "វត្តតាមិម",
                "enName": "Wattamim",
                "ancestors": [
                    "00000001",
                    "00000002",
                    "00000003"
                ]
            }
        ];

        _.forEach(data, (value) => {
            Location.insert(value);
        });
    }
});