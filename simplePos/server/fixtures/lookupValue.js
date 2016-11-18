import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {LookupValue} from '../../common/collections/lookupValue';

Meteor.startup(function () {
    if (LookupValue.find().count() == 0) {
        const data = [
            // Prefix
            {
                name: 'Prefix',
                private: true,
                options: [
                    {label: 'Mr', value: 'Mr', order: 1},
                    {label: 'Miss', value: 'Miss', order: 2},
                    {label: 'Ms', value: 'Ms', order: 3},
                    {label: 'Mrs', value: 'Mrs', order: 4}
                ]
            },
            // Gender
            {
                name: 'Gender',
                private: true,
                options: [
                    {label: 'Mal', value: 'M', order: 1},
                    {label: 'Female', value: 'F', order: 2},
                ]
            },
            // Contact Type
            {
                name: 'Contact Type',
                private: false,
                options: [
                    {label: 'Mobile', value: 'M', order: 1},
                    {label: 'Home', value: 'H', order: 2},
                    {label: 'Work', value: 'W', order: 3},
                ]
            },
            // Location Type
            {
                name: 'Location Type',
                private: false,
                options: [
                    {label: 'Province', value: 'P', order: 1},
                    {label: 'District', value: 'D', order: 2},
                    {label: 'Commune', value: 'C', order: 3},
                    {label: 'Village', value: 'V', order: 4},
                ]
            },
            // Item Type
            {
                name: 'Item Type',
                private: false,
                options: [
                    {label: 'Parent', value: 'P', order: 1},
                    {label: 'Child', value: 'C', order: 2},
                ]
            },
        ];

        _.forEach(data, (value)=> {
            LookupValue.insert(value);
        });
    }
});