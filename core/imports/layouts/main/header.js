import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {_} from 'meteor/erasaur:meteor-lodash';

// Page
import './header.html';
import './header-user.js';

Template._HeaderLayout.helpers({
    module: function () {
        let name = 'Rabbit Tech';
        let currentModule = Session.get('currentModule');

        if (!_.isUndefined(currentModule)) {
            name = Module[currentModule].name;
        }

        return {name: name, headerMenu: `${currentModule}_headerMenu`};
    }
});
