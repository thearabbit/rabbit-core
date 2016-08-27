import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {LookupValue} from '../../imports/api/collections/lookup-value.js';

Meteor.startup(function () {
    if (LookupValue.find().count() == 0) {
        const data = [
            // Prefix
            {
                name: 'Prefix',
                private: true,
                options: [
                    {label: 'Mr', value: 'Mr', index: 1},
                    {label: 'Miss', value: 'Miss', index: 2},
                    {label: 'Ms', value: 'Ms', index: 3},
                    {label: 'Mrs', value: 'Mrs', index: 4}
                ]
            },
            // Gender
            {
                name: 'Gender',
                private: true,
                options: [
                    {label: 'Mal', value: 'M', index: 1},
                    {label: 'Female', value: 'F', index: 2},
                ]
            },
        ];

        _.forEach(data, (value)=> {
            LookupValue.insert(value);
        });
    }
});