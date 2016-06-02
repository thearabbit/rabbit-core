import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Setting} from '../../imports/api/collections/setting.js';

Meteor.publish('core.setting', function coreSetting() {
    this.unblock();

    if (this.userId) {
        let data = Setting.find();
        return data;
    }

    this.ready();
});
