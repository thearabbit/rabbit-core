import {ReactiveVar} from 'meteor/reactive-var';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/erasaur:meteor-lodash';

// Page
import './content-header.html';

Template._ContentHeaderLayout.onCreated(function () {
    let self = this;
    self.pageHeader = new ReactiveVar('No Title');

    self.autorun(()=> {
        FlowRouter.watchPathChange();

        let currentTitle = FlowRouter.current().route.options.title;
        if (currentTitle) {
            currentTitle = _.isFunction(currentTitle) ? currentTitle() : currentTitle;
            self.pageHeader.set(currentTitle);
        }
    });
});

Template._ContentHeaderLayout.helpers({
    pageHeader(){
        const instance = Template.instance();
        return instance.pageHeader.get();
    }
});
