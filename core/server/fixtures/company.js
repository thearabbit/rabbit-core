import {Meteor} from 'meteor/meteor';

import {Company} from '../../imports/api/collections/company.js';

Meteor.startup(function () {
    if (Company.find().count() == 0) {
        const data = {
            khName: 'មជ្ឈមណ្ឌលបណ្តុះបណ្តាល រ៉ាប៊ីត',
            khShortName: 'មបរ',
            enName: 'Rabbit Training Center',
            enShortName: 'RTC',
            khAddress: 'ភូមិរំចេក ៤ សង្កាត់រតនៈ ក្រុងបាត់ដំបង ខេត្តបាត់ដំបង',
            enAddress: 'Romchek 4 Village, Sangkat Rottanak, Krong Battamang, Battambang Province',
            telephone: '053 50 66 777',
            email: '',
            website: ''
        };

        Company.insert(data);
    }
});