import {Meteor} from 'meteor/meteor';

import {Setting} from '../../imports/api/collections/setting.js';

Meteor.startup(function () {
    if (Setting.find().count() == 0) {
        const data = {
            headOffice: '001',
            baseCurrency: 'USD',
            language: 'en'
        };

        Setting.insert(data);
    }
});