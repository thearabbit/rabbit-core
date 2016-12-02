import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/erasaur:meteor-lodash';

Template.registerHelper('isActiveRoute', (options) => {
    options = _.isUndefined(options) ? {} : options;
    let optionsHash = _.isUndefined(options.hash) ? {} : options.hash;

    _.defaults(optionsHash, {
        name: '',
        trueValue: 'active',
    });

    let routerName = new ReactiveVar();
    Tracker.autorun(function () {
        FlowRouter.watchPathChange();
        routerName.set(FlowRouter.current().route.name);
    });

    if (routerName.get() == optionsHash.name) {
        return optionsHash.trueValue;
    } else {
        return false;
    }
});

Template.registerHelper('isNotActiveRoute', (options) => {
    options = _.isUndefined(options) ? {} : options;
    let optionsHash = _.isUndefined(options.hash) ? {} : options.hash;

    _.defaults(optionsHash, {
        name: '',
        trueValue: 'disabled',
    });

    let routerName = new ReactiveVar();
    Tracker.autorun(function () {
        FlowRouter.watchPathChange();
        routerName.set(FlowRouter.current().route.name);
    });

    if (routerName.get() != optionsHash.name) {
        return optionsHash.trueValue;
    } else {
        return false;
    }
});
