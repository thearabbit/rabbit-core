import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/erasaur:meteor-lodash';
import 'meteor/theara:template-states';

// Page
import './content-header.html';

Template._ContentHeaderLayout.onCreated(function () {
    this.state('pageHeader', 'No Title');

    this.autorun(()=> {
        FlowRouter.watchPathChange();

        let currentTitle = FlowRouter.current().route.options.title;
        if (currentTitle) {
            currentTitle = _.isFunction(currentTitle) ? currentTitle() : currentTitle;
            this.state('pageHeader', currentTitle);
        }
    });
});
