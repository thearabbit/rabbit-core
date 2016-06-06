import {Meteor} from 'meteor/meteor';
import {TAPi18n} from 'meteor/tap:i18n';

// Collection
import {Setting} from '../../imports/api/collections/setting.js';

Meteor.startup(function () {
    // Get language setting
    let setting = Setting.findOne();
    let language = 'en';

    TAPi18n.setLanguage(language)
        .done(function () {
            console.log(`Language: ${language}`);
        })
        .fail(function (error) {
            console.log(error.message);
        });
});